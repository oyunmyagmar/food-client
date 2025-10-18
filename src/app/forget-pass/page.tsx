"use client";
import React from "react";
import Link from "next/link";
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
import Image from "next/image";

const formSchema = z.object({
  email: z.email({
    message: "Invalid email. Use a format like example@email.com.",
  }),
});

const ForgetPassPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-360 h-256 flex m-auto py-5 pr-5 pl-25 gap-12">
      <div className="mt-[226px]">
        <div className="flex flex-col gap-6">
          <Button variant={"outline"} className="w-fit">
            <HiOutlineChevronLeft className="size-4" />
          </Button>

          <div>
            <h2 className="text-2xl leading-8 font-semibold text-foreground mb-1">
              Reset your password
            </h2>
            <p className="text-base leading-6 text-muted-foreground">
              Enter your email to receive a password reset link.
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
                className="w-full bg-primary text-primary-foreground hover:bg-primary/20"
              >
                Send link
              </Button>

              <Link href="/signup" className="text-center text-base leading-6">
                <p className="text-muted-foreground">
                  Don’t have an account?
                  <span className="pl-3 text-blue-600">Sign up</span>
                </p>
              </Link>
            </form>
          </Form>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden">
        <Image
          width={856}
          height={904}
          src="/login.jpg"
          alt="image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};
export default ForgetPassPage;
