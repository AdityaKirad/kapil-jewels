"use client";

import { getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { Link } from "next-view-transitions";
import { useActionState } from "react";
import { requestPasswordReset } from "../actions";
import { forgotPasswordSchema as schema } from "../schema";

export function ForgotPasswordForm() {
  const [lastResult, action, isSubmitting] = useActionState(
    requestPasswordReset,
    undefined,
  );
  const [form, fields] = useForm({
    id: "forgot-password",
    lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: "onSubmit",
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  });
  const { key, ...inputProps } = {
    ...getInputProps(fields.email, { type: "email" }),
  };
  return (
    <form
      id={form.id}
      className="flex flex-col gap-4"
      action={action}
      onSubmit={form.onSubmit}
      noValidate
    >
      <div>
        <Label className="mb-2 font-light" htmlFor={fields.email.id}>
          Email
        </Label>
        <Input placeholder="example@email.com" key={key} {...inputProps} />
        <p className="text-left text-sm text-red-500">
          {fields.email.errors?.join(", ")}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="rounded-none"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </Button>
        <p>
          or{" "}
          <Link
            href="/account/login"
            className="text-sm underline underline-offset-8 transition-[text-underline-offset] outline-none hover:underline-offset-[5px] focus-visible:underline-offset-[5px]"
          >
            Cancel
          </Link>
        </p>
      </div>
    </form>
  );
}
