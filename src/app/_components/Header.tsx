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
import { LogoComp, ShoppingCart, UserLogState } from "@/app/_components";

export const Header = () => {
  const [email, setEmail] = useState<string>("");
  // const [cartFoods, setCartFoods] = useState<CartFood[]>([]);
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  // const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    userEmail && setEmail(userEmail);
  }, []);

  // useEffect(() => {
  //   const foodsFromLocal = JSON.parse(
  //     localStorage.getItem("foodsAddedToCart") ?? "[]"
  //   );
  //   setCartFoods(foodsFromLocal);
  // }, []);

  const addressChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handleCloseAddressInput = () => {
    setIsOpenAddress(false);
  };

  const handleAddAddressLocalStorage = () => {
    address !== "" && localStorage.setItem("userAddress", address);
    setIsOpenAddress(false);
    setAddress("");
  };

  return (
    <header className="w-360 px-22 py-3 flex justify-between bg-primary items-center">
      <LogoComp />

      <div className="flex gap-[12.81px] my-1">
        <Button
          onClick={() => router.push("/signup")}
          variant={"outline"}
          className={`rounded-full border-none text-secondary-foreground px-3 cursor-pointer ${
            email && "hidden"
          }`}
        >
          Sign up
        </Button>
        <Button
          onClick={() => router.push("/login")}
          variant={"destructive"}
          className={`rounded-full border-none text-primary-foreground bg-red-500 px-3 cursor-pointer ${
            email && "hidden"
          }`}
        >
          Log in
        </Button>

        <Dialog open={isOpenAddress} onOpenChange={setIsOpenAddress}>
          <DialogTrigger>
            <div className="flex items-center px-3 py-2 gap-1 rounded-full bg-background text-xs leading-4 cursor-pointer">
              <div>
                <GrLocation size={20} className="text-red-500" />
              </div>
              <div className="text-red-500">Delivery address:</div>
              <div className="text-muted-foreground">Add Location</div>
              <div className="w-5 h-5 flex items-center justify-center">
                <FaChevronRight size={16} className="text-[#18181B]/50" />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[502px] rounded-[20px] gap-6">
            <DialogHeader>
              <DialogTitle className="text-2xl leading-8 text-foreground py-1">
                Please write your delivery address!
              </DialogTitle>
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
                className="h-10 "
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAddressLocalStorage}
                type="button"
                className="h-10"
              >
                Deliver Here
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ShoppingCart email={email} />

        <UserLogState email={email} />
      </div>
    </header>
  );
};
// const sonner = () => {
//   toast.custom((t) => (
//     <div className="w-[429px] p-6 flex flex-col gap-12">
//       <div className="text-2xl leading-8 font-semibold text-foreground">
//         You need to log in first
//       </div>
//       <div className="w-full flex gap-4">
//         <Button
//           onClick={() => {
//             router.push("/login"), toast.dismiss(t);
//           }}
//           className="flex-1 size-10"
//         >
//           Log in
//         </Button>
//         <Button
//           onClick={() => {
//             router.push("/signup"), toast.dismiss(t);
//           }}
//           variant={"outline"}
//           className="flex-1 size-10"
//         >
//           Sign up
//         </Button>
//       </div>
//     </div>
//   ));
// };
