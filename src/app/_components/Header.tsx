"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

import {
  HeaderAddressComp,
  HeaderUserLogState,
  LogoComp,
  ShoppingCart,
} from "@/app/_components";

export const Header = () => {
  const [email, setEmail] = useState<string>("");
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) setEmail(userEmail);

    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) setDeliveryAddress(savedAddress);
  }, []);

  return (
    <header className="w-360 px-22 py-3 flex justify-between bg-primary items-center">
      <LogoComp />

      <div className="flex gap-[12.81px] my-1">
        {!email && (
          <>
            <Button
              onClick={() => router.push("/signup")}
              variant={"outline"}
              className="rounded-full border-none text-secondary-foreground px-3 cursor-pointer"
            >
              Sign up
            </Button>
            <Button
              onClick={() => router.push("/login")}
              variant={"destructive"}
              className="rounded-full border-none text-primary-foreground bg-red-500 px-3 cursor-pointer"
            >
              Log in
            </Button>
          </>
        )}

        <HeaderAddressComp
          isOpenAddress={isOpenAddress}
          setIsOpenAddress={setIsOpenAddress}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
        />

        <ShoppingCart email={email} />
        <HeaderUserLogState email={email} />
      </div>
    </header>
  );
};
