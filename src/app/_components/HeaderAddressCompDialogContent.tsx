"use client";

import React from "react";
import {
  Button,
  Textarea,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { toast } from "sonner";

export const HeaderAddressCompDialogContent = ({
  setIsOpenAddress,
  deliveryAddress,
  setDeliveryAddress,
}: {
  setIsOpenAddress: (isOpenAddress: boolean) => void;
  deliveryAddress: string;
  setDeliveryAddress: (deliveryAddress: string) => void;
}) => {
  const handleAddAddressToLocalStorage = () => {
    localStorage.setItem("userAddress", deliveryAddress);
    toast("Address saved successfully!");
    setIsOpenAddress(false);
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[502px] rounded-[20px] gap-6 border-0">
        <DialogHeader className="gap-0 flex-row justify-between items-center">
          <DialogTitle className="text-2xl leading-8 text-foreground py-1">
            Please write your delivery address!
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Textarea
          placeholder="Please share your complete address"
          className="text-sm h-20"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />

        <DialogFooter className="gap-4 mt-6">
          <DialogClose asChild>
            <Button
              onClick={() => setIsOpenAddress(false)}
              className="h-10 cursor-pointer"
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleAddAddressToLocalStorage}
            disabled={!deliveryAddress}
            className="h-10 cursor-pointer"
            type="button"
          >
            Deliver Here
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};
