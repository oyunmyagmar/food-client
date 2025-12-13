"use client";

import React, { Dispatch } from "react";
import { DrawerContent, Tabs, TabsContent } from "@/components/ui";
import { EmptyCart } from "./EmptyCart";
import { CartFood } from "@/lib/type";
import {
  HeaderShoppingCartDrawerHeader,
  HeaderShoppingCartDrawerTabCart,
  HeaderShoppingCartDrawerTabOrder,
  HeaderShoppingCartDrawerTabsList,
} from "@/app/_components";

export const HeaderShoppingCartDrawerContent = ({
  cartFoods,
  email,
  reloadFoods,
  setCartOpen,
}: {
  cartFoods: CartFood[];
  email: string;
  reloadFoods: () => void;
  setCartOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-[535px] p-8 gap-6 bg-neutral-700 text-primary-foreground border-none rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto">
      <HeaderShoppingCartDrawerHeader />

      <Tabs defaultValue="cart" className="w-full gap-6">
        <HeaderShoppingCartDrawerTabsList />

        {cartFoods.length ? (
          <HeaderShoppingCartDrawerTabCart
            cartFoods={cartFoods}
            reloadFoods={reloadFoods}
            email={email}
            setCartOpen={setCartOpen}
          />
        ) : (
          <EmptyCart />
        )}

        <HeaderShoppingCartDrawerTabOrder />
      </Tabs>
    </DrawerContent>
  );
};
