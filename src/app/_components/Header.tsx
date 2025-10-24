"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
  DialogFooter,
} from "@/components/ui";
import { GrLocation } from "react-icons/gr";
import { FaChevronRight } from "react-icons/fa6";
import { CartFood } from "@/lib/type";
import { Logo, ShopCart, UserLogState } from "@/app/_components";

export const Header = () => {
  const [email, setEmail] = useState<string>("");
  const [cartFoods, setCartFoods] = useState<CartFood[]>([]);
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  // const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    userEmail && setEmail(userEmail);
  }, []);

  // console.log(email);
  // if (!email) {
  //   router.push("/login");
  // }

  useEffect(() => {
    const foodsFromLocal = JSON.parse(
      localStorage.getItem("foodsAddedToCart") ?? "[]"
    );
    setCartFoods(foodsFromLocal);
  }, []);

  // console.log(cartFoods, "cartFoods");

  const handleCloseAddressInput = () => {
    setIsOpenAddress(false);
  };

  const addressChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handleAddAddressToLocalStorage = () => {
    localStorage.setItem("userAddress", address);
    setIsOpenAddress(false);
    setAddress("");
  };

  // useEffect(() => {
  //   const locationAddress = localStorage.getItem("userAddress");
  //   locationAddress && setDeliveryAddress(locationAddress);
  // }, []);

  return (
    <header className="w-360 px-22 py-3 flex justify-between bg-primary items-center m-auto">
      <Logo />

      <div className="flex gap-[12.81px]">
        <Button
          onClick={() => router.push("/signup")}
          variant={"outline"}
          className={`rounded-full leading-5 text-secondary-foreground ${
            email && "hidden"
          }`}
        >
          Sign up
        </Button>
        <Button
          onClick={() => router.push("/login")}
          variant={"destructive"}
          className={`rounded-full leading-5 text-primary-foreground bg-red-500 ${
            email && "hidden"
          }`}
        >
          Log in
        </Button>

        <Dialog open={isOpenAddress} onOpenChange={setIsOpenAddress}>
          <DialogTrigger>
            <div className="flex items-center px-3 py-2 gap-1 rounded-full bg-background text-xs leading-4">
              <div>
                <GrLocation size={20} className="text-red-500" />
              </div>
              <div className="text-red-500">Delivery address:</div>
              <div className="text-muted-foreground">Add Location</div>
              <div className="w-5 h-5 flex items-center justify-center">
                <FaChevronRight className="text-[#18181B]/50" />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[502px] rounded-[20px] gap-6">
            <DialogHeader>
              <DialogTitle>Please write your delivery address!</DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <Textarea
              placeholder="Please share your complete address"
              className="text-sm h-20"
              value={address}
              onChange={addressChangeHandler}
            />

            <DialogFooter className="flex-row gap-4 mt-6">
              <Button
                onClick={handleCloseAddressInput}
                type="button"
                variant="outline"
                className="h-10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAddressToLocalStorage}
                type="button"
                className="h-10"
              >
                Deliver Here
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ShopCart />

        <UserLogState email={email} />
      </div>
    </header>
  );
};
