"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const SignupCompAlreadyAccount = () => {
  const router = useRouter();
  return (
    <div className="text-base leading-6 flex gap-3 justify-center items-center">
      <div className="text-muted-foreground">Already have an account?</div>
      <div
        onClick={() => router.push("/login")}
        className="text-blue-600 cursor-pointer"
      >
        Log in
      </div>
    </div>
  );
};
