"use client";
import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { LuShoppingCart } from "react-icons/lu";
import { CartFood } from "@/lib/type";
import { CartWithPreOrderFoods, EmptyCart } from "@/app/_components";

export const ShoppingCart = ({ email }: { email: string }) => {
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

        <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-[535px] p-8 gap-6 bg-neutral-700 text-primary-foreground border-none rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto">
          <DrawerHeader className="flex-row gap-3 items-center py-1">
            <LuShoppingCart size={24} />
            <DrawerTitle className="text-xl leading-7 text-primary-foreground">
              Order detail
            </DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>

          <Tabs defaultValue="cart" className="w-full gap-6">
            <TabsList className="w-full h-full rounded-full gap-2 justify-center items-end">
              <TabsTrigger
                value="cart"
                className="h-9 rounded-full border-none data-[state=active]:bg-red-500 data-[state=active]:text-primary-foreground font-normal text-lg leading-7"
              >
                Cart
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="h-9 rounded-full border-none data-[state=active]:bg-red-500 data-[state=active]:text-primary-foreground font-normal text-lg leading-7"
              >
                Order
              </TabsTrigger>
            </TabsList>

            {cartFoods.length ? (
              <CartWithPreOrderFoods
                cartFoods={cartFoods}
                reloadFoods={reloadFoods}
                email={email}
                setCartOpen={setCartOpen}
              />
            ) : (
              <EmptyCart />
            )}

            <TabsContent value="order">Change your password here.</TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
