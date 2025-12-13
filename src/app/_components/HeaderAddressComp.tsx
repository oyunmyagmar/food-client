"use client";

import React, { Dispatch } from "react";
import { Dialog, DialogTrigger } from "@/components/ui";
import { FaChevronRight } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { HeaderAddressCompDialogContent } from "@/app/_components";

export const HeaderAddressComp = ({
  isOpenAddress,
  setIsOpenAddress,
  deliveryAddress,
  setDeliveryAddress,
}: {
  isOpenAddress: boolean;
  setIsOpenAddress: Dispatch<React.SetStateAction<boolean>>;
  deliveryAddress: string;
  setDeliveryAddress: Dispatch<React.SetStateAction<string>>;
}) => {
  return (
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

      <HeaderAddressCompDialogContent
        setIsOpenAddress={setIsOpenAddress}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
      />
    </Dialog>
  );
};
