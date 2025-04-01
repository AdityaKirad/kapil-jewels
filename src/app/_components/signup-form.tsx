"use client";

import { getInputProps, useForm, type FieldMetadata } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { signUp } from "~/actions/auth";
import { signUpSchema as schema } from "~/schema/auth";
import { useActionState } from "react";
import { type z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function SignupForm() {
  const [lastResult, action, isSubmitting] = useActionState(signUp, undefined);
  const [form, fields] = useForm({
    id: "signup",
    lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });
  return (
    <form
      className="flex flex-col gap-2"
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
    >
      <Field
        meta={fields.firstName}
        label="First Name"
        placeholder="First Name"
        type="text"
      />

      <Field
        meta={fields.lastName}
        label="Last Name"
        placeholder="Last Name"
        type="text"
      />

      <Field
        meta={fields.email}
        label="Email"
        placeholder="example@email.com"
        type="email"
      />

      <Field meta={fields.password} label="Password" type="password" />

      <Button className="mt-2" type="submit" disabled={isSubmitting}>
        Sign up
      </Button>
    </form>
  );
}

function Field({
  label,
  meta,
  placeholder,
  type,
}: {
  label: string;
  meta: FieldMetadata<string, z.infer<typeof schema>, string[]>;
  placeholder?: string;
  type: "email" | "password" | "text";
}) {
  const { key: _key, ...inputProps } = getInputProps(meta, {
    type,
    value: true,
  });
  return (
    <div>
      <Label htmlFor={inputProps.id}>{label}:</Label>
      <Input placeholder={placeholder} {...inputProps} />
      <p>{meta.errors?.join(", ")}</p>
    </div>
  );
}
