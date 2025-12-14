"use client";

import React, { useEffect, useState } from "react";
import { Button, TabsContent } from "@/components/ui";
import { CartFood } from "@/lib/type";
import {
  HeaderShoppingCaDrTaCartDeliveryLocationComp,
  HeaderShoppingCaDrTaCartMyCartComp,
  HeaderShoppingCaDrTaCartPaymentInfoComp,
  OrderLoginAlertDialog,
  OrderSuccessAlertDialog,
} from "@/app/_components";
import { toast } from "sonner";

export const HeaderShoppingCartDrawerTabCart = ({
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
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [orderSuccessAlert, setOrderSuccessAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      setShowLoginAlert(true);
      return;
    }

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      toast.warning("Delivery address required!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartItemsTotalPrice: cartFoodsPriceBeforeShipping + shippingPrice,
          cartFoods,
          address: trimmedAddress,
        }),
      });

      if (!response.ok) {
        toast.error(
          "Something went wrong while placing order! Please try again."
        );
      }

      if (response.ok) {
        setTimeout(() => {
          setOrderSuccessAlert(true);
        }, 1000);
      }
    } catch (error) {
      console.error("Error!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-14 bg-background text-foreground p-4 rounded-[20px]">
          <HeaderShoppingCaDrTaCartMyCartComp
            cartFoods={cartFoods}
            reloadFoods={reloadFoods}
          />
          <HeaderShoppingCaDrTaCartDeliveryLocationComp
            address={address}
            setAddress={setAddress}
          />
        </div>

        <div className="bg-background text-foreground flex flex-col p-4 gap-5 rounded-[20px]">
          <HeaderShoppingCaDrTaCartPaymentInfoComp
            cartFoodsPriceBeforeShipping={cartFoodsPriceBeforeShipping}
            shippingPrice={shippingPrice}
          />

          <Button
            disabled={loading}
            onClick={createOrder}
            variant="destructive"
            className="w-full rounded-full h-11 bg-red-500 py-3 cursor-pointer"
          >
            Checkout
          </Button>
        </div>
      </div>

      <OrderLoginAlertDialog
        showLoginAlert={showLoginAlert}
        setShowLoginAlert={setShowLoginAlert}
      />

      <OrderSuccessAlertDialog
        orderSuccessAlert={orderSuccessAlert}
        setOrderSuccessAlert={setOrderSuccessAlert}
        setCartOpen={setCartOpen}
        reloadFoods={reloadFoods}
      />
    </div>
  );
};
