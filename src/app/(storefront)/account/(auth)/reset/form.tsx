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
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { onResetAction } from "./action";
import type { SchemaOutput } from "./schema";
import { schema } from "./schema";

export function ResetPasswordForm({ token }: { token: string }) {
  const [formState, formAction, isSubmitting] = useActionState(onResetAction, {
    success: false,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<SchemaOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      token,
      confirmPassword: "",
      password: "",
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
          void form.handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)));
          })(evt);
        }}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password </FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password </FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input type="hidden" {...form.register("token")} />

        {formState?.errorMessage && (
          <p className="text-destructive text-sm">{formState.errorMessage}</p>
        )}
        {formState?.successMessage && (
          <p className="text-sm">{formState.successMessage}</p>
        )}

        <Button
          className="w-fit"
          size="lg"
          type="submit"
          disabled={form.formState.isSubmitting || isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
