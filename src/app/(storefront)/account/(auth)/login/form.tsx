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
import { onLoginAction } from "./action";
import type { SchemaOutput } from "./schema";
import { schema } from "./schema";

export function LoginForm() {
  const [formState, formAction, isSubmitting] = useActionState(onLoginAction, {
    success: false,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<SchemaOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link
          className="text-end text-xs font-medium underline underline-offset-8 transition-[text-underline-offset] outline-none hover:underline-offset-[5px] focus-visible:underline-offset-[5px]"
          href="/account/forgot-password"
        >
          Forgot your password?
        </Link>

        {formState?.errorMessage && (
          <p className="text-destructive text-sm">{formState.errorMessage}</p>
        )}

        <div className="flex items-center gap-4">
          <Button
            className="font-normal"
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
    </Form>
  );
}
