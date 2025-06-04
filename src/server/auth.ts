import crypto from "crypto";
import { generateTOTP, verifyTOTP } from "@epic-web/totp";
import { env } from "~/env";
import { and, eq } from "drizzle-orm";
import { db } from "./drizzle";
import type { UserSelectType, VerificationSelectType } from "./drizzle/schema";
import { password as passwordTable, verification } from "./drizzle/schema";

const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
};

export const checkCommonPassword = async (password: string) => {
  const hash = crypto
    .createHash("sha1")
    .update(password, "utf8")
    .digest("hex")
    .toUpperCase();
  const [prefix, suffix] = [hash.slice(0, 5), hash.slice(5)];
  const controller = new AbortController();

  try {
    const timeout = setTimeout(() => controller.abort(), 1000);

    const res = await fetch(
      `https://api.pwnedpasswords.com/range/${encodeURIComponent(prefix)}`,
      {
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`PwnedPasswords API responded with ${res.status} status`);
      return false;
    }

    const data = await res.text();

    return data.split(/\r?\n/).some((line) => line.includes(suffix));
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn("Password check timed out");
    } else {
      console.warn("Unknown error occurred while checking password", error);
    }
    return false;
  }
};

export const createToken = () => crypto.randomBytes(32).toString("hex");

export function createVerificationToken(payload: object) {
  const token = JSON.stringify(payload);
  const encodedPayload = encodeBase64URL(token);
  const signature = generateHMAC(token);
  return `${encodedPayload}.${signature}`;
}

export const decodeBase64URL = (data: string) =>
  Buffer.from(data, "base64url").toString("utf8");

export const doesUserExist = ({
  email,
  type,
}: Pick<UserSelectType, "email" | "type">) =>
  db.query.user.findFirst({
    columns: { id: true, email: true },
    where: (user, { and, eq }) =>
      and(eq(user.email, email), eq(user.type, type)),
  });

export const encodeBase64URL = (data: string | Buffer) =>
  Buffer.from(data).toString("base64url");

export const getExpirationDate = (expires = 600) =>
  new Date(Date.now() + expires * 1000);

export async function getPasswordHash(password: string) {
  const salt = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
    "hex",
  );
  const key = await generateKey(password, salt);
  return `${salt}:${key.toString("hex")}`;
}

async function generateKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password.normalize("NFKC"),
      salt,
      config.dkLen,
      {
        N: config.N,
        p: config.p,
        r: config.r,
        maxmem: 128 * config.N * config.r * 2,
      },
      (err, key) => {
        if (err) reject(err);
        else resolve(key);
      },
    );
  });
}

const generateHMAC = (payload: string) =>
  crypto
    .createHmac("sha256", env.HMAC_SECRET)
    .update(payload)
    .digest("base64url");

export async function isOTPValid({
  actor,
  otp,
  target,
  type,
}: { otp: string } & Pick<
  VerificationSelectType,
  "actor" | "target" | "type"
>) {
  const config = await db.query.verification.findFirst({
    columns: {
      actor: false,
      createdAt: false,
      expiresAt: false,
      target: false,
      type: false,
    },
    where: (verification, { and, eq, gt }) =>
      and(
        eq(verification.actor, actor),
        eq(verification.target, target),
        eq(verification.type, type),
        gt(verification.expiresAt, new Date()),
      ),
  });

  if (!config) return false;

  const isValid = await verifyTOTP({
    otp,
    ...config,
  });

  if (!isValid) return false;

  db.delete(verification)
    .where(
      and(
        eq(verification.actor, actor),
        eq(verification.target, target),
        eq(verification.type, type),
      ),
    )
    .catch(() => {
      // do nothing
    });

  return true;
}

export async function prepareVerification({
  period = 60 * 10,
  ...verifierConfig
}: Pick<VerificationSelectType, "actor" | "target" | "type"> & {
  period?: number;
}) {
  const { otp, ...verificationConfig } = await generateTOTP({
    period,
    algorithm: "SHA-256",
    charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  });
  await db
    .insert(verification)
    .values({
      expiresAt: getExpirationDate(verificationConfig.period),
      ...verifierConfig,
      ...verificationConfig,
    })
    .onConflictDoUpdate({
      target: [verification.actor, verification.target, verification.type],
      set: {
        expiresAt: getExpirationDate(verificationConfig.period),
        ...verificationConfig,
      },
    });

  return { otp };
}

export const SESSION_KEY = "__session";

export async function updatePassword({
  email,
  password,
  type,
}: Pick<UserSelectType, "email" | "type"> & { password: string }) {
  const user = await doesUserExist({
    email,
    type,
  });

  if (!user) return false;

  await db
    .update(passwordTable)
    .set({ hash: await getPasswordHash(password) })
    .where(eq(passwordTable.userId, user.id));

  return true;
}

export async function verifyPassword({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  const passwordHash = await db.query.password
    .findFirst({
      columns: { hash: true },
      where: (password, { eq }) => eq(password.userId, id),
    })
    .then((res) => res?.hash);

  if (!passwordHash) return false;

  const [salt, key] = passwordHash.split(":");

  if (!key || !salt) return false;

  const computedKey = await generateKey(password, salt);

  return crypto.timingSafeEqual(computedKey, Buffer.from(key, "hex"));
}

export function decodeVerificationToken<T = unknown>(token: string): T | false {
  const [encodedPayload] = token.split(".");

  if (!encodedPayload) return false;

  try {
    const json = decodeBase64URL(encodedPayload);
    return JSON.parse(json) as T;
  } catch {
    return false;
  }
}

export function verifyVerificationToken<T = unknown>(token: string): T | false {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || token.split(".").length !== 2)
    return false;

  let payload;
  try {
    payload = decodeBase64URL(encodedPayload);
  } catch {
    return false;
  }

  const computedSignature = generateHMAC(payload);

  const signatureBuffer = Buffer.from(signature, "base64url");
  const computedSignatureBuffer = Buffer.from(computedSignature, "base64url");

  if (signatureBuffer.length !== computedSignatureBuffer.length) return false;

  const isSignatureValid = crypto.timingSafeEqual(
    signatureBuffer,
    computedSignatureBuffer,
  );

  if (!isSignatureValid) return false;

  try {
    return JSON.parse(payload) as T;
  } catch {
    return false;
  }
}
