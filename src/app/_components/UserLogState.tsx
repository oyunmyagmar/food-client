import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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

export const UserLogState = ({ email }: { email: string | null }) => {
  const router = useRouter();

  const userLogOutHandler = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };
  return (
    <div className={`${!email && "hidden"}`}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant={"destructive"}
            className="size-9 rounded-full bg-red-500"
          >
            <FiUser size={16} />
          </Button>
        </HoverCardTrigger>

        <HoverCardContent className="bg-background rounded-xl">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-xl leading-7 font-semibold text-foreground">
              {email}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={`rounded-full leading-5 text-secondary-foreground`}
                >
                  Sign out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to sign out?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="hidden" />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={userLogOutHandler}>
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
