import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const OrderSuccessAlertDialog = ({
  successAlertDialog,
  setSuccessAlertDialog,
  setCartOpen,
  reloadFoods,
}: {
  successAlertDialog: boolean;
  setSuccessAlertDialog: (successAlertDialog: boolean) => void;
  setCartOpen: (cartOpen: boolean) => void;
  reloadFoods: () => void;
}) => {
  const router = useRouter();

  return (
    <AlertDialog open={successAlertDialog} onOpenChange={setSuccessAlertDialog}>
      <AlertDialogContent className="sm:max-w-166 gap-6 rounded-[20px] border-0">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl leading-8 text-foreground text-center">
            Your order has been successfully placed !
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>

        <div className="w-39 h-[271px] relative m-auto">
          <Image
            src={"/successOrder.png"}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <AlertDialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              setCartOpen(false);
              localStorage.removeItem("cartFoods");
              localStorage.removeItem("userAddress");
              reloadFoods();
              setSuccessAlertDialog(false);
            }}
            variant={"secondary"}
            className="h-10 rounded-full px-12 py-2.5 cursor-pointer"
          >
            Back to home
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
