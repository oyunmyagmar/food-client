"use client";

import React, { useEffect, useState } from "react";
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
import {
  CreateNewPass,
  LogImage,
  LoginCompNoAccount,
  ResetPass,
  VerifyEmail,
} from "../_components/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email({
    message: "Invalid email. Use a format like example@email.com.",
  }),
  password: z.string({ message: "Incorrect password. Please try again." }),
});

const LoginPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail);
  }, []);

  if (email) {
    router.push("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values?.email,
        password: values?.password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        toast("Invalid email! Please try again.");
      } else if (response.status === 400) {
        toast("Incorrect password! Please try again.");
      }
    }

    const res = await response.json();
    const userId = res.user._id;

    if (res.success) {
      toast(res.message);

      localStorage.setItem("userEmail", values.email);
      localStorage.setItem("userId", userId);
      router.push("/");
    }
  }

  return (
    <div className="w-360 h-256 flex m-auto py-5 pr-5 pl-25 gap-12">
      <div className="mt-[226px]">
        <div className="flex flex-col gap-6">
          <Button
            variant={"outline"}
            onClick={() => router.push("/signup")}
            className="w-fit cursor-pointer"
          >
            <HiOutlineChevronLeft className="size-4" />
          </Button>

          <div>
            <h2 className="text-2xl leading-8 font-semibold text-foreground mb-1">
              Log in
            </h2>
            <p className="text-base leading-6 text-muted-foreground">
              Log in to enjoy your favorite dishes.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-104">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className="py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-6">
                <div className="text-sm leading-5 text-secondary-foreground underline cursor-pointer">
                  Forgot password ?
                </div>

                <Button
                  variant={"secondary"}
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/20 cursor-pointer"
                >
                  Let's Go
                </Button>
              </div>
            </form>
          </Form>
          <LoginCompNoAccount />
        </div>
      </div>

      <LogImage />
    </div>
  );
};
export default LoginPage;
