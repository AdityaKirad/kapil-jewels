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
import { CircleCheck } from "lucide-react";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { onForgetPasswordAction } from "./action";
import { schema, type SchemaOutput } from "./schema";

export function ForgetPasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, isSubmitting] = useActionState(
    onForgetPasswordAction,
    { success: false },
  );
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
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

        {formState.success ||
          (form.formState.isSubmitSuccessful && (
            <div className="bg-background flex items-start gap-2 rounded-md p-2 text-left text-sm">
              <CircleCheck className="stroke-background size-4 shrink-0 fill-green-500" />
              Successfully sent you an email We&apos;ve sent you an email which
              you can use to reset your password. Check your spam folder if you
              haven&apos;t received it after a few minutes.
            </div>
          ))}
        {formState?.errorMessage && (
          <div className="bg-background flex items-start gap-2 rounded-md p-2 text-left text-sm">
            <CircleCheck className="stroke-background fill-destructive size-4 shrink-0" />
            {formState.errorMessage}
          </div>
        )}

        <Button
          className="mt-2 w-full"
          type="submit"
          disabled={form.formState.isSubmitting || isSubmitting}
        >
          Send reset instructions
        </Button>
      </form>
    </Form>
  );
}
