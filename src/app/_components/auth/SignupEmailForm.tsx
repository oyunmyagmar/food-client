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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email({
    message: "Invalid email. Use a format like example@email.com",
  }),
});

export const SignupEmailForm = ({
  handleNextStep,
  email,
  setEmail,
}: {
  handleNextStep: () => void;
  email: string;
  setEmail: (email: string) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (values.email.length) {
      setEmail(values.email);
    }
    console.log(values.email);
    handleNextStep();
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant={"outline"} className="w-fit">
        <HiOutlineChevronLeft className="size-4" />
      </Button>

      <div>
        <h2 className="text-2xl leading-8 font-semibold text-foreground mb-1">
          Create your account
        </h2>
        <p className="text-base leading-6 text-muted-foreground">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"secondary"}
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/20 cursor-pointer"
          >
            Let's Go
          </Button>

          <div className="text-base leading-6 flex gap-3 justify-center items-center">
            <div className="text-muted-foreground">
              Already have an account?
            </div>
            <div
              onClick={() => router.push("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Log in
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
