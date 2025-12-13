"use client";

import React from "react";
import { Button, HoverCard, HoverCardTrigger } from "@/components/ui";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { HeaderUserLogHoverContent } from "@/app/_components";

export const HeaderUserLogState = ({ email }: { email: string }) => {
  const router = useRouter();

  const userLogOutHandler = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div className={`${!email && "hidden"}`}>
      <HoverCard>
        <HoverCardTrigger asChild className="cursor-pointer p-0">
          <Button
            variant={"destructive"}
            className="size-9 rounded-full bg-red-500 cursor-pointer"
          >
            <FiUser size={16} className="-ml-[1px]" />
          </Button>
        </HoverCardTrigger>

        <HeaderUserLogHoverContent
          email={email}
          userLogOutHandler={userLogOutHandler}
        />
      </HoverCard>
    </div>
  );
};
