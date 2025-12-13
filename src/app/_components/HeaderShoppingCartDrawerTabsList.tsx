import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui";

export const HeaderShoppingCartDrawerTabsList = () => {
  return (
    <TabsList className="w-full h-full rounded-full gap-2 justify-center items-end">
      <TabsTrigger
        value="cart"
        className="h-9 rounded-full border-none data-[state=active]:bg-red-500 data-[state=active]:text-primary-foreground font-normal text-lg leading-7 cursor-pointer"
      >
        Cart
      </TabsTrigger>
      <TabsTrigger
        value="order"
        className="h-9 rounded-full border-none data-[state=active]:bg-red-500 data-[state=active]:text-primary-foreground font-normal text-lg leading-7 cursor-pointer"
      >
        Order
      </TabsTrigger>
    </TabsList>
  );
};
