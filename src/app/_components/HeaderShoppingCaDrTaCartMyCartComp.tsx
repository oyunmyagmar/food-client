import React from "react";
import { CartFood } from "@/lib/type";
import { CartFoodCardComp } from "./CartFoodCardComp";

export const HeaderShoppingCaDrTaCartMyCartComp = ({
  cartFoods,
  reloadFoods,
}: {
  cartFoods: CartFood[];
  reloadFoods: () => void;
}) => {
  return (
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
  );
};
