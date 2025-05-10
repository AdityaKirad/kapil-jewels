"use client";

import { getInputProps, useForm, type FieldMetadata } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { Link } from "next-view-transitions";
import { useActionState } from "react";
import { type z } from "zod";
import { signIn } from "../actions";
import { signInSchema as schema } from "../schema";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [lastResult, action, isSubmitting] = useActionState(signIn, undefined);
  const [form, fields] = useForm({
    id: "signin",
    lastResult,
    defaultValue: {
      redirectTo,
    },
    constraint: getZodConstraint(schema),
    shouldValidate: "onSubmit",
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  });
  return (
    <form
      className="flex flex-col gap-4"
      id={form.id}
      action={action}
      onSubmit={form.onSubmit}
      noValidate
    >
      <Field
        label="Email"
        placeholder="Email"
        type="email"
        meta={fields.email}
      />

      <Field
        label="Password"
        type="password"
        placeholder="Password"
        meta={fields.password}
      />

      <input {...getInputProps(fields.redirectTo, { type: "hidden" })} />

      <Link
        className="text-end text-xs font-medium underline underline-offset-8 transition-[text-underline-offset] outline-none hover:underline-offset-[5px] focus-visible:underline-offset-[5px]"
        href="/account/forgot-password"
      >
        Forgot your password?
      </Link>

      <p className="text-sm text-red-500">{form.errors?.join(", ")}</p>

      <div className="flex items-center gap-4">
        <Button
          className="rounded-none font-normal"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
        <Link
          href="/"
          className="text-xs underline underline-offset-8 transition-[text-underline-offset] outline-none hover:underline-offset-[5px] focus-visible:underline-offset-[5px]"
        >
          Return to Store
        </Link>
      </div>
    </form>
  );
}

function Field({
  meta,
  label,
  placeholder,
  type,
}: {
  meta: FieldMetadata<
    string,
    Omit<z.infer<typeof schema>, "rememberMe">,
    string[]
  >;
  label: string;
  placeholder?: string;
  type: "email" | "password";
}) {
  const { key: _key, ...inputProps } = getInputProps(meta, { type });
  return (
    <div>
      <Label className="mb-2 font-normal" htmlFor={meta.id}>
        {label}
      </Label>
      <Input
        className="rounded-none focus-visible:shadow-none"
        placeholder={placeholder}
        {...inputProps}
      />
      <p className="text-left text-sm text-red-500">
        {meta.errors?.join(", ")}
      </p>
    </div>
  );
}
