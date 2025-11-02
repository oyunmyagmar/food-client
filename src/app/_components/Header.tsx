"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { GrLocation } from "react-icons/gr";
import { FaChevronRight } from "react-icons/fa6";
import {
  AddressComp,
  LogoComp,
  ShoppingCart,
  UserLogState,
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

        <Dialog open={isOpenAddress} onOpenChange={setIsOpenAddress}>
          <DialogTrigger>
            <div className="flex items-center px-3 py-2 gap-1 rounded-full bg-background text-xs leading-4 cursor-pointer">
              <div>
                <GrLocation size={20} className="text-red-500" />
              </div>
              <div className="text-red-500">Delivery address:</div>
              <div className="text-muted-foreground">
                {deliveryAddress || "Add Location"}
              </div>
              <div className="w-5 h-5 flex items-center justify-center">
                <FaChevronRight size={16} className="text-[#18181B]/50" />
              </div>
            </div>
          </DialogTrigger>

          <AddressComp
            setIsOpenAddress={setIsOpenAddress}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
          />
        </Dialog>
        <ShoppingCart email={email} />
        <UserLogState email={email} />
      </div>
    </header>
  );
};
