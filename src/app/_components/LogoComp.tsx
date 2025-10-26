import React from "react";
import { LogoImgHeader } from "@/app/_components";
import { useRouter } from "next/navigation";

export const LogoComp = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center gap-3 cursor-pointer"
    >
      <LogoImgHeader />

      <div>
        <div className="text-xl leading-7 font-semibold text-primary-foreground">
          Nom<span className="text-red-500">Nom</span>
        </div>
        <div className="text-xs leading-4 text-secondary">Swift delivery</div>
      </div>
    </div>
  );
};
