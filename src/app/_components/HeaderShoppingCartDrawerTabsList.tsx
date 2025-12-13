import React, { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui";
import { toast } from "sonner";

export const HeaderShoppingCartDrawerTabsList = ({
  email,
}: {
  email: string;
}) => {
  const [userOrders, setUserOrders] = useState();

  const getUserOrders = async () => {
    const res = await fetch("/api/orders/get-user-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res) {
      toast.error("No orders found!");
    }

    const data = res.json();
    console.log(data);
  };

  return (
    <TabsList className="w-full h-full rounded-full gap-2 justify-center items-end">
      <TabsTrigger
        value="cart"
        className="h-9 rounded-full border-none data-[state=active]:bg-red-500 data-[state=active]:text-primary-foreground font-normal text-lg leading-7 cursor-pointer"
      >
        Cart
      </TabsTrigger>
      <TabsTrigger
        onClick={getUserOrders}
        value="order"
        className="h-9 rounded-full border-none data-[state=active]:bg-red-500 data-[state=active]:text-primary-foreground font-normal text-lg leading-7 cursor-pointer"
      >
        Order
      </TabsTrigger>
    </TabsList>
  );
};
