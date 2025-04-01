"use client";

import { getInputProps, useForm, type FieldMetadata } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-label";
import { signIn } from "~/actions/auth";
import { signInSchema as schema } from "~/schema/auth";
import Form from "next/form";
import { useActionState } from "react";
import { type z } from "zod";
import { CheckboxConform } from "./conform-inputs/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SignInForm() {
  const [lastResult, action, isSubmitting] = useActionState(signIn, undefined);
  const [form, fields] = useForm({
    id: "signin",
    lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });
  return (
    <Form
      className="flex flex-col gap-2"
      id={form.id}
      action={action}
      onSubmit={form.onSubmit}
      noValidate
    >
      <Field
        label="Email"
        placeholder="example@email.com"
        type="email"
        meta={fields.email}
      />

      <Field label="Password" type="password" meta={fields.password} />

      <Label>
        <CheckboxConform
          className="mr-2 align-middle"
          meta={fields.rememberMe}
        />
        <span className="align-middle">Remember me</span>
      </Label>

      <p className="text-sm text-red-500">{form.errors?.join(", ")}</p>

      <Button className="mt-2" type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </Form>
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
      <Label htmlFor={meta.id}>{label}:</Label>
      <Input {...inputProps} placeholder={placeholder} />
      <p className="text-sm text-red-500">{meta.errors?.join(", ")}</p>
    </div>
  );
}
