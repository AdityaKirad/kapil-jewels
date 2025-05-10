"use client";

import { getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { useActionState } from "react";
import { resetUserPassword } from "../actions";
import { resetPasswordSchema as schema } from "../schema";

export function ResetPasswordForm({ token }: { token: string }) {
  const [lastResult, action, isSubmitting] = useActionState(
    resetUserPassword,
    undefined,
  );
  const [form, fields] = useForm({
    id: "reset-password",
    lastResult,
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
      <div>
        <Label className="mb-2 font-light" htmlFor={fields.password.id}>
          Password
        </Label>
        <Input
          className="rounded-none focus-visible:shadow-none"
          {...getInputProps(fields.password, { type: "password" })}
        />
        <p className="text-left text-sm text-red-500">
          {fields.password.errors?.join(", ")}
        </p>
      </div>

      <div>
        <Label className="mb-2 font-light" htmlFor={fields.confirmPassword.id}>
          Confirm Password
        </Label>
        <Input
          className="rounded-none focus-visible:shadow-none"
          {...getInputProps(fields.confirmPassword, { type: "password" })}
        />
        <p className="text-left text-sm text-red-500">
          {fields.confirmPassword.errors?.join(", ")}
        </p>
      </div>

      <input type="hidden" name="token" value={token} />

      <Button
        className="w-fit rounded-none"
        size="lg"
        type="submit"
        disabled={isSubmitting}
      >
        Reset Password
      </Button>
    </form>
  );
}
