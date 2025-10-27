"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Separator,
  Textarea,
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
import {
  CartFoodCardComp,
  LogoImgShoppingCart,
  OrderAlertDialog,
} from "@/app/_components";

export const ShoppingCart = ({ email }: { email: string }) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartFoods, setCartFoods] = useState<CartFood[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const shippingPrice = 0.99;
  let cartFoodsPriceBeforeShipping: number = 0;
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  cartFoods.forEach((cartFood) => {
    const foodUnitsPrice = cartFood.food.price * cartFood.quantity;
    cartFoodsPriceBeforeShipping += foodUnitsPrice;
  });

  const reloadFoods = () => {
    setCartOpen(true);

    const cartFoodsFromLocal = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );
    setCartFoods(cartFoodsFromLocal);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    userId && setUserId(userId);
    const userAddress = localStorage.getItem("userAddress");
    userAddress && setAddress(userAddress);
  }, []);

  const createOrder = async () => {
    if (email) {
      try {
        await fetch("http://localhost:4000/api/orders", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            cartItemsTotalPrice: cartFoodsPriceBeforeShipping + shippingPrice,
            cartFoods,
            address,
          }),
        });

        alert("Your order has been successfully placed !");
        setCartOpen(false);
        localStorage.removeItem("cartFoods");
        localStorage.removeItem("userAddress");
      } catch (error) {
        console.error("Order placement unsuccessful !", error);
      }
    } else if (!email) {
      setShowAlertDialog(true);
    }
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
            <div>
              <LuShoppingCart size={24} />
            </div>
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

            <TabsContent value="cart">
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-14 bg-background text-foreground p-4 rounded-[20px]">
                  <div className="flex flex-col gap-5">
                    {cartFoods.length > 0 ? (
                      <div className="text-xl leading-7 font-semibold text-muted-foreground">
                        My cart
                      </div>
                    ) : (
                      <div className="text-xl leading-7 font-semibold text-foreground">
                        My cart
                      </div>
                    )}

                    {cartFoods.length > 0 ? (
                      cartFoods.map((cartFood) => (
                        <CartFoodCardComp
                          cartFoods={cartFoods}
                          cartFood={cartFood}
                          reloadFoods={reloadFoods}
                          key={cartFood.food._id}
                        />
                      ))
                    ) : (
                      <div className="py-8 px-12 flex flex-col gap-1 bg-secondary rounded-xl items-center">
                        <LogoImgShoppingCart />
                        <div className="text-base leading-7 font-bold">
                          Your cart is empthy
                        </div>
                        <div className="text-xs leading-4 text-muted-foreground text-center">
                          Hungry? 🍔 Add some delicious dishes to your cart and
                          satisfy your cravings!
                        </div>
                      </div>
                    )}
                  </div>

                  {cartFoods.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="text-xl leading-7 font-semibold text-muted-foreground">
                        Delivery location
                      </div>
                      {address && (
                        <Textarea
                          className="h-20 leading-5"
                          placeholder="Please share your complete address"
                          defaultValue={address}
                          // onChange={(e) => setAddress(e.target.value)}
                        />
                      )}
                      {address?.length === 0 && (
                        <div className="text-[12.8px] leading-[19.2px] text-destructive">
                          Please complete your address
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {cartFoods.length <= 0 ? (
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

                    <Separator className="border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />

                    <div className="flex justify-between leading-7 items-center">
                      <div className="text-base text-muted-foreground">
                        Total
                      </div>
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
                ) : (
                  <div className="bg-background text-foreground flex flex-col p-4 gap-5 rounded-[20px]">
                    <div className="text-xl leading-7 font-semibold text-muted-foreground">
                      Payment info
                    </div>
                    <div className="flex flex-col gap-2 text-base leading-7">
                      <div className="flex justify-between">
                        <div className="text-muted-foreground">Items</div>
                        <div className="font-bold">
                          ${cartFoodsPriceBeforeShipping}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-muted-foreground">Shipping</div>
                        <div className="font-bold">{shippingPrice}$</div>
                      </div>
                    </div>

                    <Separator className="border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />

                    <div className="flex justify-between leading-7 items-center">
                      <div className="text-base text-muted-foreground">
                        Total
                      </div>
                      <div className="text-lg font-semibold">
                        ${cartFoodsPriceBeforeShipping + shippingPrice}
                      </div>
                    </div>

                    <Button
                      onClick={createOrder}
                      variant="destructive"
                      className="w-full rounded-full h-11 bg-red-500 py-3"
                    >
                      Checkout
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="order">Change your password here.</TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>

      <OrderAlertDialog
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
      />
    </div>
  );
};
