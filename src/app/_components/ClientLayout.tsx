"use client";
import React, { ReactNode } from "react";
import { Header, Footer } from "@/app/_components";

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
