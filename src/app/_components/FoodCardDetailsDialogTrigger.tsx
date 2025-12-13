import React from "react";
import { DialogTrigger } from "@/components/ui";
import { NewFoodType } from "@/lib/type";

export const FoodCardDetailsDialogTrigger = ({
  filteredFood,
}: {
  filteredFood: NewFoodType;
}) => {
  return (
    <DialogTrigger asChild className="cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2.5 font-semibold items-center">
          <div className="text-2xl leading-8 text-red-500 flex-1">
            {filteredFood.foodName}
          </div>
          <div className="text-lg leading-7 text-foreground">
            ${filteredFood.price}
          </div>
        </div>

        <div className="text-sm leading-5 text-foreground">
          {filteredFood.ingredients}
        </div>
      </div>
    </DialogTrigger>
  );
};
