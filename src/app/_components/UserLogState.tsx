import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const UserLogState = ({ email }: { email: string }) => {
  const router = useRouter();

  const userLogOutHandler = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div className={`${!email && "hidden"}`}>
      <HoverCard>
        <HoverCardTrigger asChild className="cursor-pointer p-0">
          <Button
            variant={"destructive"}
            className="size-9 rounded-full bg-red-500"
          >
            <FiUser size={16} className="-ml-[1px]" />
          </Button>
        </HoverCardTrigger>

        <HoverCardContent className="w-fit bg-background rounded-xl border-0">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-xl leading-7 font-semibold text-foreground">
              {email && email}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"secondary"} className="rounded-full  px-3">
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
                  <AlertDialogCancel className="flex-1 h-10 py-2.5">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="flex-1 h-10 py-2.5"
                    onClick={userLogOutHandler}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
