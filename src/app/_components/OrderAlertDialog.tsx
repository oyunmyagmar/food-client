import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const OrderAlertDialog = ({
  showAlertDialog,
  setShowAlertDialog,
}: {
  showAlertDialog: boolean;
  setShowAlertDialog: (showAlertDialog: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <div>
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent className="gap-12 rounded-[20px]">
          <AlertDialogHeader className="flex-row justify-between items-center">
            <Button variant={"ghost"} className="size-10" />

            <AlertDialogTitle className="text-2xl leading-8 text-foreground">
              You need to log in first
            </AlertDialogTitle>

            <Button
              onClick={() => setShowAlertDialog(false)}
              variant={"secondary"}
              className="w-10 h-10 rounded-full"
            >
              <IoCloseOutline size={16} />
            </Button>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-4">
            <AlertDialogAction
              onClick={() => router.push("/login")}
              className="flex-1 size-10"
            >
              Log in
            </AlertDialogAction>

            <AlertDialogCancel
              onClick={() => router.push("/signup")}
              className="flex-1 size-10"
            >
              Sign up
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
