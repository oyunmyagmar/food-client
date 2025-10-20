"use client";
import React, { useState } from "react";
import Image from "next/image";

import { SignupEmailForm, SignupPasswordForm } from "../_components/auth";

const SignupPage = () => {
  const [step, setStep] = useState<number>(0);
  const StepComponents = [SignupEmailForm, SignupPasswordForm][step];
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

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
