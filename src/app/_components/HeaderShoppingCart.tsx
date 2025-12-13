"use client";

import React, { useState } from "react";
import { Button, Drawer, DrawerTrigger } from "@/components/ui";
import { LuShoppingCart } from "react-icons/lu";
import { CartFood } from "@/lib/type";
import { HeaderShoppingCartDrawerContent } from "./HeaderShoppingCartDrawerContent";

export const HeaderShoppingCart = ({ email }: { email: string }) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartFoods, setCartFoods] = useState<CartFood[]>([]);

  const reloadFoods = () => {
    setCartOpen(true);

    const cartFoodsFromLocal = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );
    setCartFoods(cartFoodsFromLocal);
  };

  return (
    <div>
      <Drawer direction="right" open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerTrigger
          asChild
          onClick={reloadFoods}
          className="cursor-pointer border-0"
        >
          <Button
            variant={"outline"}
            className="size-9 rounded-full relative border-0"
          >
            <LuShoppingCart size={16} className="text-secondary-foreground" />
            {cartFoods.length > 0 && (
              <div className="w-5 h-5 absolute left-5 bottom-5 z-30 rounded-full bg-red-500 text-[10px] leading-4 font-medium text-primary-foreground flex justify-center items-center">
                {cartFoods.length}
              </div>
            )}
          </Button>
        </DrawerTrigger>

        <HeaderShoppingCartDrawerContent
          cartFoods={cartFoods}
          email={email}
          reloadFoods={reloadFoods}
          setCartOpen={setCartOpen}
        />
      </Drawer>
    </div>
  );
};
