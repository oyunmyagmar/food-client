"use client";

import React, { Dispatch, useState } from "react";
import { DrawerContent, Tabs } from "@/components/ui";
import { EmptyCart } from "./EmptyCart";
import { CartFood, UserOrderType } from "@/lib/type";
import {
  HeaderShoppingCartDrawerHeader,
  HeaderShoppingCartDrawerTabCart,
  HeaderShoppingCartDrawerTabOrder,
  HeaderShoppingCartDrawerTabsList,
} from "@/app/_components";
import { toast } from "sonner";

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
  const [userOrders, setUserOrders] = useState<UserOrderType[]>([]);
  console.log({ userOrders });

  const getUserOrders = async () => {
    const res = await fetch(
      "http://localhost:4000/api/orders/get-user-orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!res) {
      toast.error("No orders found!");
    }

    const { data } = await res.json();
    setUserOrders(data);
  };

  return (
    <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-[535px] p-8 gap-6 bg-neutral-700 text-primary-foreground border-none rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto">
      <HeaderShoppingCartDrawerHeader />

      <Tabs defaultValue="cart" className="w-full gap-6">
        <HeaderShoppingCartDrawerTabsList getUserOrders={getUserOrders} />

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

        <HeaderShoppingCartDrawerTabOrder userOrders={userOrders} />
      </Tabs>
    </DrawerContent>
  );
};
