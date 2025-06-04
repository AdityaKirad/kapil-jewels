import { createId } from "@paralleldrive/cuid2";
import type { InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

const UserType = ["customer", "admin"] as const;

export const user = pgTable(
  "user",
  {
    id: text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    type: text({ enum: UserType }).notNull().default("customer"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [unique().on(table.email, table.type), index().on(table.email)],
);

export const password = pgTable("password", {
  hash: text().notNull().unique(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const invite = pgTable("invite", {
  id: text()
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text().notNull().unique(),
  token: text().notNull().unique(),
  accepted: boolean().notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$defaultFn(() => new Date()),
});

export const verification = pgTable(
  "verification",
  {
    algorithm: text().notNull(),
    charSet: text("char_set").notNull(),
    digits: integer().notNull(),
    period: integer().notNull(),
    secret: text().notNull(),
    target: text().notNull(),
    type: text({ enum: ["reset-password", "login"] }).notNull(),
    actor: text({ enum: UserType }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    expiresAt: timestamp().notNull(),
  },
  (table) => [primaryKey({ columns: [table.target, table.type, table.actor] })],
);

export const session = pgTable("session", {
  id: text()
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  token: text().notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$defaultFn(() => new Date()),
  expiresAt: timestamp("expires_at").notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  password: one(password),
  sessions: many(session),
}));

export const passwordRelations = relations(password, ({ one }) => ({
  user: one(user, {
    fields: [password.userId],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export type UserSelectType = InferSelectModel<typeof user>;

export type VerificationSelectType = InferSelectModel<typeof verification>;
