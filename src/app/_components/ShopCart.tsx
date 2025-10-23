import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  Textarea,
} from "@/components/ui";
import { LuShoppingCart } from "react-icons/lu";
import { CartFood } from "@/lib/type";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";

export const ShopCart = ({
  cartFoods,
  deliveryAddress,
  registeredWithEmail,
}: {
  cartFoods: CartFood[];
  deliveryAddress: string | null;
  registeredWithEmail: string | null;
}) => {
  const shippingPrice = 0.99;
  let cartItemsTotalPrice: number = 0;
  cartFoods.forEach((cartFood) => {
    const itemTotalPrice = cartFood.food.price * cartFood.quantity;
    cartItemsTotalPrice += itemTotalPrice;
  });

  const createOrder = async () => {
    const response = await fetch(
      "https://food-next-backend.vercel.app/api/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartFoods,
          deliveryAddress,
          cartItemsTotalPrice,
          registeredWithEmail,
        }),
      }
    );

    const res = await response.json();
    console.log(res, "KGYOI");
    if (!res.ok) {
      alert("Order placement unsuccessful !");
    } else {
      alert("Your order has been successfully placed !");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="size-9 rounded-full">
          <LuShoppingCart size={16} className="text-secondary-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[535px] p-8 gap-6 bg-neutral-700 text-primary-foreground border-none rounded-[20px]">
        <DialogHeader className="flex-row gap-3 items-center py-1">
          <div>
            <LuShoppingCart size={24} />
          </div>
          <DialogTitle className="text-xl leading-7 text-primary-foreground">
            Order detail
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

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
            <div className="text-xl leading-7 font-semibold text-muted-foreground">
              My cart
            </div>

            {cartFoods.length > 0 &&
              cartFoods.map((cartFood) => (
                <div key={cartFood.food._id}>
                  <div className="w-full flex gap-2.5">
                    <div className="w-31 h-30 rounded-xl relative overflow-hidden">
                      <Image
                        src={cartFood.food.image}
                        alt=""
                        width={124}
                        height={120}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-2.5">
                          <div className="flex-1">
                            <div className="text-base leading-7 font-bold text-red-500">
                              {cartFood.food.foodName}
                            </div>
                            <div className="text-xs leading-4 text-foreground">
                              {cartFood.food.ingredients}
                            </div>
                          </div>
                          <div className="w-9 h-9 rounded-full border border-red-500 bg-white flex justify-center items-center">
                            <IoCloseOutline
                              size={16}
                              className="text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between text-foreground">
                          <div className="flex items-center">
                            <Button variant={"ghost"} className="size-9">
                              <FiMinus size={16} />
                            </Button>
                            <div className="text-lg leading-7 font-semibold">
                              {cartFood.quantity}
                            </div>
                            <Button variant={"ghost"} className="size-9">
                              <FiPlus size={16} />
                            </Button>
                          </div>
                          <div className="text-base leading-7 font-bold">
                            ${cartFood.food.price * cartFood.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-5 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
                </div>
              ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xl leading-7 font-semibold text-muted-foreground">
              Delivery location
            </div>
            <Textarea
              className="h-20 leading-5"
              placeholder="Please share your complete address"
              value={deliveryAddress}
            />
            {!deliveryAddress?.length && (
              <div className="text-[12.8px] leading-[19.2px] text-destructive">
                Please complete your address
              </div>
            )}
          </div>
        </div>

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
            onClick={createOrder}
            variant="destructive"
            className="w-full rounded-full h-11 bg-red-500"
          >
            Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
