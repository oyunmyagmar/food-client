"use client";
import React, { ReactNode } from "react";
import { Header, Footer } from "@/app/_components";

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-360 flex flex-col bg-[#404040] m-auto">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
