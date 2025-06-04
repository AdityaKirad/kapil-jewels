"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { onForgetPasswordAction } from "./action";
import type { SchemaOutput } from "./schema";
import { schema } from "./schema";

export function ForgotPasswordForm() {
  const [formState, formAction, isSubmitting] = useActionState(
    onForgetPasswordAction,
    { success: false },
  );
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<SchemaOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      ...(formState.fields ?? {}),
    },
    errors: formState.errors,
  });
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          void form.handleSubmit(() =>
            startTransition(() => formAction(new FormData(formRef.current!))),
          )(evt);
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email: </FormLabel>
              <FormControl>
                <Input
                  placeholder="example@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formState?.successMessage && (
          <p className="text-sm">{formState.successMessage}</p>
        )}
        {formState?.errorMessage && (
          <p className="text-destructive text-sm">{formState.errorMessage}</p>
        )}

        <div className="flex items-center gap-4">
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting || isSubmitting}
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
    </Form>
  );
}
