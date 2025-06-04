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
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { onLoginAction } from "./action";
import { schema, type SchemaOutput } from "./schema";

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
  useEffect(() => {
    if (form.formState.isSubmitSuccessful && formState.success) {
      form.reset();
    }
  }, [form, formState.success]);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
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
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password: </FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || isSubmitting}
        >
          Continue with Email
        </Button>
      </form>
    </Form>
  );
}
