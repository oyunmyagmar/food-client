"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";

const formSchema = z.object({
  email: z
    .email({ message: "Invalid email. Use a format like example@email.com" })
    .min(2)
    .max(20),
});

export const SignupEmailForm = ({
  email,
  setEmail,
  handleNextStep,
}: {
  email: string;
  setEmail: (sd: string) => void;
  handleNextStep: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    handleNextStep();
    console.log(values);
  }
  return (
    <div>
      <h2>Create your account</h2>
      <p>Sign up to explore your favorite dishes.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormDescription>
                  <button>Already have an account?</button>
                  <button>Log in</button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Let's Go</Button>
          <div>
            Already have an account?<span>Log in</span>
          </div>
        </form>
      </Form>
    </div>
  );
};
