import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui";

export const FoodCardDetailsNameAndIngredients = ({
  filteredFoodName,
  filteredFoodIngredients,
}: {
  filteredFoodName: string;
  filteredFoodIngredients: string;
}) => {
  return (
    <div className="flex flex-col gap-3 mt-9">
      <DialogTitle className="text-3xl leading-9 text-red-500">
        {filteredFoodName}
      </DialogTitle>
      <DialogDescription className="text-base leading-6 text-foreground">
        {filteredFoodIngredients}
      </DialogDescription>
    </div>
  );
};
