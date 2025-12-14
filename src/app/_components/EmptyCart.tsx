import React from "react";
import { Button, Separator, TabsContent } from "@/components/ui";
import { LogoImgShoppingCart } from "@/app/_components";

export const EmptyCart = ({
  tabTitle,
  message,
  description,
}: {
  tabTitle: string;
  message: string;
  description: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-14 bg-background text-foreground p-4 rounded-[20px]">
        <div className="flex flex-col gap-5">
          <div className="text-xl leading-7 font-semibold text-foreground">
            {tabTitle}
          </div>

          <div className="py-8 px-12 flex flex-col gap-1 bg-secondary rounded-xl items-center">
            <LogoImgShoppingCart />
            <div className="text-base leading-7 font-bold">{message}</div>
            <div className="text-xs leading-4 text-muted-foreground text-center">
              {description}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background text-foreground flex flex-col p-4 gap-5 rounded-[20px]">
        <div className="text-xl leading-7 font-semibold text-foreground">
          Payment info
        </div>

        <div className="flex flex-col gap-2 text-base leading-7">
          <div className="flex justify-between">
            <div className="text-muted-foreground">Items</div>
            <div className="font-bold">-</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground">Shipping</div>
            <div className="font-bold">-</div>
          </div>
        </div>

        <Separator className="border-t border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />

        <div className="flex justify-between leading-7 items-center">
          <div className="text-base text-muted-foreground">Total</div>
          <div className="text-lg font-semibold">-</div>
        </div>

        <Button
          disabled={true}
          variant="destructive"
          className="w-full rounded-full h-11 bg-red-500 py-3"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
