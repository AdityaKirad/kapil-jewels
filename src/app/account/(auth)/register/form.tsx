"use client";

import { getInputProps, useForm, type FieldMetadata } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { useActionState } from "react";
import { type z } from "zod";
import { signUp } from "../actions";
import { signUpSchema as schema } from "../schema";

export function SignupForm() {
  const [lastResult, action, isSubmitting] = useActionState(signUp, undefined);
  const [form, fields] = useForm({
    id: "signup",
    lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: "onSubmit",
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  });
  return (
    <form
      className="flex flex-col gap-4 text-left"
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

      <Field
        meta={fields.password}
        label="Password"
        placeholder="Password"
        type="password"
      />

      <Button
        className="w-fit rounded-none"
        size="lg"
        type="submit"
        disabled={isSubmitting}
      >
        Create
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
  const { key, ...inputProps } = getInputProps(meta, {
    type,
    value: true,
  });
  return (
    <div>
      <Label className="mb-2" htmlFor={meta.id}>
        {label}
      </Label>
      <Input key={key} placeholder={placeholder} {...inputProps} />
      <p className="text-left text-sm text-red-500">
        {meta.errors?.join(", ")}
      </p>
    </div>
  );
}
