"use client";
import React, { useState } from "react";
import {
  LogImage,
  SignupEmailForm,
  SignupPasswordForm,
} from "../_components/auth";

const SignupPage = () => {
  const [step, setStep] = useState<number>(0);
  const StepComponents = [SignupEmailForm, SignupPasswordForm][step];
  const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  const handleNextStep = (email: string) => {
    setEmail(email);
    setStep(1);
  };

  return (
    <div className="w-360 h-256 flex m-auto py-5 pr-5 pl-25 gap-12">
      <div className="mt-[226px]">
        <StepComponents email={email} handleNextStep={handleNextStep} />
      </div>
      <LogImage />
    </div>
  );
};
export default SignupPage;
