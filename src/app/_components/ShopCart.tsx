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
} from "@/components/ui";
import { LuShoppingCart } from "react-icons/lu";
import { CartFood } from "@/lib/type";
import { LogoImg } from "./LogoImg";
import { CartCardItem } from "./CartCardItem";

export const ShopCart = ({ email }: { email: string }) => {
  const [address, setAddress] = useState<string>("");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartFoods, setCartFoods] = useState<CartFood[]>([]);

  const shippingPrice = 0.99;

  let cartItemsTotalPrice: number = 0;
  cartFoods.forEach((cartFood) => {
    const itemTotalPrice = cartFood.food.price * cartFood.quantity;
    cartItemsTotalPrice += itemTotalPrice;
  });

  const reloadFoods = () => {
    setCartOpen(true);

    const foodsFromLocal = JSON.parse(
      localStorage.getItem("foodsAddedToCart") ?? "[]"
    );
    setCartFoods(foodsFromLocal);
  };

  const createOrder = async (email: string) => {
    const response = await fetch("http://localhost:4000/api/orders", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartFoods,
        cartItemsTotalPrice,
      }),
    });

    const responseRes = await response.json();
    if (!responseRes.ok) {
      alert("Order placement unsuccessful !");
    } else {
      alert("Your order has been successfully placed !");
    }

    const res = await fetch(`http://localhost:4000/api/signup${email}`, {
      method: "PATCH",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    const resRes = await res.json();
    console.log(resRes, "deliveryAddressdeliveryAddress");
  };

  useEffect(() => {
    const locationAddress = localStorage.getItem("userAddress");
    locationAddress && setAddress(locationAddress);
  }, []);

  return (
    <Drawer direction="right" open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerTrigger asChild onClick={reloadFoods} className="cursor-pointer">
        <Button variant={"outline"} className="size-9 rounded-full">
          <LuShoppingCart size={16} className="text-secondary-foreground" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-[535px] p-8 gap-6 bg-neutral-700 text-primary-foreground border-none rounded-tl-[20px] rounded-bl-[20px]">
        <DrawerHeader className="flex-row gap-3 items-center py-1">
          <div>
            <LuShoppingCart size={24} />
          </div>
          <DrawerTitle className="text-xl leading-7 text-primary-foreground">
            Order detail
          </DrawerTitle>
          <DrawerDescription className="hidden" />
        </DrawerHeader>

        <div className="w-full flex gap-2 justify-between p-1 bg-background rounded-full">
          <Button
            variant={"destructive"}
            className="flex-1 rounded-full bg-red-500"
          >
            Cart
          </Button>
          <Button
            variant={"destructive"}
            className="flex-1 rounded-full bg-red-500"
          >
            Order
          </Button>
        </div>

        <div className="w-full flex flex-col gap-14 bg-background text-foreground p-4 rounded-[20px]">
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
                <CartCardItem cartFood={cartFood} reloadFoods={reloadFoods} />
              ))
            ) : (
              <div className="py-8 px-12 flex flex-col gap-1 bg-secondary rounded-xl items-center">
                <LogoImg />
                <div className="text-base leading-7 font-bold">
                  Your cart is empthy
                </div>
                <div className="text-xs leading-4 text-muted-foreground text-center">
                  Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                  your cravings!
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
                  onChange={(e) => setAddress(e.target.value)}
                />
              )}
              {!address?.length && (
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
              <div className="text-base text-muted-foreground">Total</div>
              <div className="text-lg font-semibold">-</div>
            </div>

            <Button
              disabled={true}
              variant="destructive"
              className="w-full rounded-full h-11 bg-red-500"
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
                <div className="font-bold">${cartItemsTotalPrice}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-muted-foreground">Shipping</div>
                <div className="font-bold">{shippingPrice}$</div>
              </div>
            </div>

            <Separator className="border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />

            <div className="flex justify-between leading-7 items-center">
              <div className="text-base text-muted-foreground">Total</div>
              <div className="text-lg font-semibold">
                ${cartItemsTotalPrice + shippingPrice}
              </div>
            </div>

            <Button
              onClick={() => createOrder(email)}
              variant="destructive"
              className="w-full rounded-full h-11 bg-red-500"
            >
              Checkout
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
