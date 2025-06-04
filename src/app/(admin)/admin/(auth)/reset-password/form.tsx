"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { onResetPasswordAction } from "./action";
import { schema, type SchemaOutput } from "./schema";

export function ResetPasswordForm({ email, token }: { email: string; token: string | undefined }) {
  const [formState, formAction, isSubmitting] = useActionState(onResetPasswordAction, { success: false });
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<SchemaOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
      ...(formState.fields ?? {}),
    },
    errors: formState.errors,
  });
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          void form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
      >
        <div className="grid gap-2">
          <Label>Email: </Label>
          <Input value={email} type="email" disabled />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password: </FormLabel>
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
              <FormLabel>Confirm Password: </FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input type="hidden" value={token} {...form.register("token")} />

        {form.formState.errors.token?.message && (
          <p className="text-destructive text-sm">{form.formState.errors.token.message}</p>
        )}

        <Button type="submit" disabled={form.formState.isSubmitting || isSubmitting}>
          Continue with Email
        </Button>
      </form>
    </Form>
  );
}
