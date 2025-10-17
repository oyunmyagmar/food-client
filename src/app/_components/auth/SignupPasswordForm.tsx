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
  Password: z.string({ message: "" }).min(6).max(10),

  Confirm: z
    .string({
      message: "Those password did’t match, Try again",
    })
    .min(6, { message: "Weak password. Use numbers and symbols." })
    .max(10),
});

export const SignupPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Password: "",
      Confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full h-10 bg-red-100"></div>

          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormLabel>Create a strong password</FormLabel>
                <FormDescription>
                  Create a strong password with letters, numbers.
                </FormDescription>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full h-10 bg-red-100"></div>
          <FormField
            control={form.control}
            name="Confirm"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormLabel>Create a strong password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm" {...field} />
                </FormControl>
                <FormDescription>
                  Create a strong password with letters, numbers.
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
