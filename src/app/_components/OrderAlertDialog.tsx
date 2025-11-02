import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const OrderAlertDialog = ({
  showLoginAlertDialog,
  setShowLoginAlertDialog,
}: {
  showLoginAlertDialog: boolean;
  setShowLoginAlertDialog: (showLoginAlertDialog: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <AlertDialog
      open={showLoginAlertDialog}
      onOpenChange={setShowLoginAlertDialog}
    >
      <AlertDialogContent className="sm:max-w-[429px] gap-12 rounded-[20px] border-0">
        <AlertDialogHeader className="flex-row justify-between items-center">
          <AlertDialogDescription className="w-10" />

          <AlertDialogTitle className="text-2xl leading-8 text-foreground">
            You need to log in first
          </AlertDialogTitle>

          <Button
            onClick={() => setShowLoginAlertDialog(false)}
            variant={"secondary"}
            className="w-10 h-10 rounded-full"
          >
            <IoCloseOutline size={16} />
          </Button>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-4">
          <AlertDialogAction
            onClick={() => router.push("/login")}
            className="flex-1 size-10 py-2.5"
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
  );
};
