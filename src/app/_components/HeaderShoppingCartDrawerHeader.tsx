import React from "react";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui";
import { LuShoppingCart } from "react-icons/lu";

export const HeaderShoppingCartDrawerHeader = () => {
  return (
    <DrawerHeader className="flex-row gap-3 items-center py-1">
      <LuShoppingCart size={24} />
      <DrawerTitle className="text-xl leading-7 text-primary-foreground">
        Order detail
      </DrawerTitle>
      <DrawerDescription />
    </DrawerHeader>
  );
};
