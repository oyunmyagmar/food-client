import React from "react";
import { Separator } from "@/components/ui";

export const HeaderShoppingCaDrTaCartPaymentInfoComp = ({
  cartFoodsPriceBeforeShipping,
  shippingPrice,
}: {
  cartFoodsPriceBeforeShipping: number;
  shippingPrice: 0.99;
}) => {
  return (
    <div className="flex flex-col gap-5">
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
    </div>
  );
};
