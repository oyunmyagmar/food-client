import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  HoverCardContent,
} from "@/components/ui";

export const HeaderUserLogHoverContent = ({
  email,
  userLogOutHandler,
}: {
  email: string;
  userLogOutHandler: () => void;
}) => {
  return (
    <HoverCardContent className="w-fit bg-background rounded-xl border-0">
      <div className="flex flex-col gap-2 items-center">
        <div className="text-xl leading-7 font-semibold text-foreground">
          {email && email}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"secondary"}
              className="rounded-full px-3 cursor-pointer"
            >
              Sign out
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="w-[429px] rounded-[20px] gap-12">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl leading-8 text-foreground py-1">
                Are you sure you want to sign out?
              </AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogFooter className="gap-4">
              <AlertDialogCancel className="flex-1 h-10 py-2.5 cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="flex-1 h-10 py-2.5 cursor-pointer"
                onClick={userLogOutHandler}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </HoverCardContent>
  );
};
