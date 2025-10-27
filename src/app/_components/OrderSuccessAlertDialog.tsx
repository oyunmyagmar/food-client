import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const OrderSuccessAlertDialog = ({
  successAlertDialog,
  setSuccessAlertDialog,
}: {
  successAlertDialog: boolean;
  setSuccessAlertDialog: (successAlertDialog: boolean) => void;
}) => {
  return (
    <AlertDialog open={successAlertDialog} onOpenChange={setSuccessAlertDialog}>
      <AlertDialogContent className="sm:max-w-166 gap-6 rounded-[20px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl leading-8 text-foreground">
            Your order has been successfully placed !
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <Image src={"/successOrder.png"} alt="" width={616} height={391} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Back to home</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
