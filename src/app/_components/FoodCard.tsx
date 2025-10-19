import { NewFoodType } from "@/lib/type";
import Image from "next/image";
import React from "react";

export const FoodCard = ({ filteredFood }: { filteredFood: NewFoodType }) => {
  console.log(filteredFood.image);
  return (
    <div className="w-[397.3px] p-4 rounded-[20px] flex flex-col gap-5 bg-background">
      <div className="w-[365.3px] h-[210px] rounded-xl relative overflow-hidden">
        {filteredFood.image ? (
          <Image
            src={filteredFood.image}
            alt=""
            width={365.3}
            height={210}
            className="object-cover w-full h-full"
            unoptimized
          />
        ) : (
          ""
        )}
      </div>
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
    </div>
  );
};
