import React from "react";
import { Button } from "@/components/ui";
import { FiMinus, FiPlus } from "react-icons/fi";

export const FoodCardDetailsPriceAndMinusQuantityPlusBtn = ({
  quantity,
  filteredFoodPrice,
  handleDecrementQuantity,
  handleIncrementQuantity,
}: {
  quantity: number;
  filteredFoodPrice: number;
  handleDecrementQuantity: () => void;
  handleIncrementQuantity: () => void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-foreground">
        <div className="text-base leading-6">Total price</div>
        <div className="text-2xl leading-8 font-semibold">
          ${filteredFoodPrice * quantity}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => handleDecrementQuantity()}
          variant={"outline"}
          className={`w-11 h-11 rounded-full border-foreground cursor-pointer ${
            quantity === 1 && "border-input"
          }`}
        >
          <FiMinus size={16} />
        </Button>

        <div className="text-lg leading-7 font-semibold text-foreground">
          {quantity}
        </div>

        <Button
          onClick={handleIncrementQuantity}
          variant={"outline"}
          className="size-11 rounded-full border-foreground cursor-pointer"
        >
          <FiPlus size={16} />
        </Button>
      </div>
    </div>
  );
};
