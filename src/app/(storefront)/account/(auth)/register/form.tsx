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
import { onSignupAction } from "./action";
import { schema, type SchemaOutput } from "./schema";

export function SignupForm() {
  const [formState, formAction, isSubmitting] = useActionState(onSignupAction, {
    success: false,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<SchemaOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      ...(formState?.fields ?? {}),
    },
    errors: formState.errors,
  });
  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="space-y-2"
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
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formState?.errorMessage && (
          <p className="text-destructive text-sm">{formState.errorMessage}</p>
        )}
        {formState?.successMessage && (
          <p className="text-sm">{formState.successMessage}</p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || isSubmitting}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
