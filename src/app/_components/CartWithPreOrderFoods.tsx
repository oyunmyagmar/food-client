import React, { useEffect, useState } from "react";
import { Button, Separator, Textarea, TabsContent } from "@/components/ui";
import { CartFood } from "@/lib/type";
import {
  CartFoodCardComp,
  OrderAlertDialog,
  OrderSuccessAlertDialog,
} from "@/app/_components";

export const CartWithPreOrderFoods = ({
  cartFoods,
  reloadFoods,
  email,
  setCartOpen,
}: {
  cartFoods: CartFood[];
  reloadFoods: () => void;
  email: string;
  setCartOpen: (cartOpen: boolean) => void;
}) => {
  const [address, setAddress] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  let cartFoodsPriceBeforeShipping: number = 0;
  const shippingPrice = 0.99;
  const [showLoginAlertDialog, setShowLoginAlertDialog] = useState(false);
  const [successAlertDialog, setSuccessAlertDialog] = useState<boolean>(false);

  cartFoods.forEach((cartFood) => {
    const foodUnitsPrice = cartFood.food.price * cartFood.quantity;
    cartFoodsPriceBeforeShipping += foodUnitsPrice;
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    userId && setUserId(userId);
    const userAddress = localStorage.getItem("userAddress");
    userAddress && setAddress(userAddress);
  }, []);

  const createOrder = async () => {
    if (!email) {
      setShowLoginAlertDialog(true);
      return;
    } else if (!address) {
      alert("Please complete your address");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartItemsTotalPrice: cartFoodsPriceBeforeShipping + shippingPrice,
          cartFoods,
          address,
        }),
      });

      const result = await response.json();
      if (result.status == 201) {
        setSuccessAlertDialog(true);
        localStorage.removeItem("cartFoods");
        localStorage.removeItem("userAddress");
        reloadFoods();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Order placement unsuccessful !", error);
    }
  };

  return (
    <div>
      <TabsContent value="cart">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-14 bg-background text-foreground p-4 rounded-[20px]">
            <div className="flex flex-col gap-5">
              <div className="text-xl leading-7 font-semibold text-muted-foreground">
                My cart
              </div>

              {cartFoods.length > 0 &&
                cartFoods.map((cartFood) => (
                  <CartFoodCardComp
                    key={cartFood.food._id}
                    cartFoods={cartFoods}
                    cartFood={cartFood}
                    reloadFoods={reloadFoods}
                  />
                ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-xl leading-7 font-semibold text-muted-foreground">
                Delivery location
              </div>
              <div>
                <Textarea
                  className="h-20 leading-5"
                  placeholder="Please share your complete address"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                {!address && (
                  <div className="text-[12.8px] leading-[19.2px] text-destructive">
                    Please complete your address
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-background text-foreground flex flex-col p-4 gap-5 rounded-[20px]">
            <div className="text-xl leading-7 font-semibold text-muted-foreground">
              Payment info
            </div>
            <div className="flex flex-col gap-2 text-base leading-7">
              <div className="flex justify-between">
                <div className="text-muted-foreground">Items</div>
                <div className="font-bold">${cartFoodsPriceBeforeShipping}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-muted-foreground">Shipping</div>
                <div className="font-bold">{shippingPrice}$</div>
              </div>
            </div>

            <Separator className="border-t border-dashed border-[#09090B]/50 bg-transparent" />

            <div className="flex justify-between leading-7 items-center">
              <div className="text-base text-muted-foreground">Total</div>
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
        </div>
      </TabsContent>

      <OrderAlertDialog
        showLoginAlertDialog={showLoginAlertDialog}
        setShowLoginAlertDialog={setShowLoginAlertDialog}
      />

      <OrderSuccessAlertDialog
        successAlertDialog={successAlertDialog}
        setSuccessAlertDialog={setSuccessAlertDialog}
        setCartOpen={setCartOpen}
      />
    </div>
  );
};
