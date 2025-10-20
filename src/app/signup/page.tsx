"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { SignupEmailForm, SignupPasswordForm } from "../_components/auth";

// const formSchema = z
//   .object({
//     email: z.email({
//       message: "Invalid email. Use a format like example@email.com",
//     }),
//     password: z
//       .string({ message: "Weak password. Use numbers and symbols." })
//       .min(6, { message: "Password must be at least 6 characters long." })
//       .max(20, { message: "Password must be no more than 20 characters long." })
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`|\\]).{6,20}$/,
//         "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character((e.g. !@#$%^&*))."
//       ),

//     confirm: z.string(),
//   })
//   .refine((data) => data.password === data.confirm, {
//     message: "Those password did’t match, Try again",
//     path: ["confirm"],
//   });

const SignupPage = () => {
  const [step, setStep] = useState<number>(0);
  const StepComponents = [SignupEmailForm, SignupPasswordForm][step];
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     confirm: "",
  //   },
  // });

  // const router = useRouter();

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log("working");
  //   setStep(2);
  //   console.log(values.email, "values");
  // }

  // function onSubmitCreateUser(values: z.infer<typeof formSchema>) {
  //   const { email, password } = values;
  //   console.log(values, "values");

  //   const createUser = async () => {
  //     await fetch("http://localhost:4000/api/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //   };
  //   createUser();
  // }

  return (
    <div className="w-360 h-256 flex m-auto py-5 pr-5 pl-25 gap-12">
      <div className="mt-[226px]">
        <StepComponents
          handleNextStep={handleNextStep}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />

        {/* {step === 1 && (
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
        )} */}
        {/* {step === 2 && (
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
              <form
                onSubmit={form.handleSubmit(onSubmitCreateUser)}
                className="space-y-4"
              >
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

                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem className="w-104">
                      <FormControl>
                        <Input
                          placeholder="Confirm"
                          {...field}
                          className="py-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-6">
                  <div className="flex gap-2 items-center">
                    <Input
                      type="checkbox"
                      className="w-4 h-4 rounded-sm border-foreground"
                    />
                    <div className="text-sm text-muted-foreground">
                      Show password
                    </div>
                  </div>

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
                </div>
              </form>
            </Form>
          </div>
        )} */}
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
export default SignupPage;
