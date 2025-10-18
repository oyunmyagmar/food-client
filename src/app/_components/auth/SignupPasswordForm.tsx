"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import { HiOutlineChevronLeft } from "react-icons/hi";

const formSchema = z.object({
  password: z
    .string({ message: "Weak password. Use numbers and symbols." })
    .min(6, { message: "Password must be at least 6 characters long." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`|\\]).{6,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character((e.g. !@#$%^&*))."
    ),

  confirm: z
    .string({
      message: "Those password did’t match, Try again",
    })
    .refine((confirm) => confirm === password, { message: "" }),
});

export const SignupPasswordForm = ({
  password,
  setPassword,
  handleNextStep,
}: {
  password: string;
  setPassword: (password: string) => void;
  handleNextStep: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPassword(values.password);
    handleNextStep();
    console.log(values);
  }
  return (
    <div className="flex flex-col gap-6">
      <Button variant={"outline"} className="w-fit">
        <HiOutlineChevronLeft className="size-4" />
      </Button>

      <div>
        <h2 className="text-2xl leading-8 font-semibold text-foreground mb-1">
          Create a strong password
        </h2>
        <p className="text-base leading-6 text-muted-foreground">
          Create a strong password with letters, numbers.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input placeholder="Password" {...field} className="py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input placeholder="Confirm" {...field} className="py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"secondary"}
            type="submit"
            className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/20"
          >
            Let's Go
          </Button>

          <a
            href="/"
            className="mt-2 flex justify-center gap-3 text-base leading-6"
          >
            <p className="text-muted-foreground">Already have an account?</p>
            <p className="text-blue-600">Log in</p>
          </a>
        </form>
      </Form>
    </div>
  );
};
