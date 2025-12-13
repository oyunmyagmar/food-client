"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const LoginCompNoAccount = () => {
  const router = useRouter();
  return (
    <div className="text-base leading-6 flex gap-3 justify-center items-center">
      <div className="text-muted-foreground">Don’t have an account?</div>
      <div
        onClick={() => router.push("/signup")}
        className="text-blue-600 cursor-pointer"
      >
        Sign up
      </div>
    </div>
  );
};
