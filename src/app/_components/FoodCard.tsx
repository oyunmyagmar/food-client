"use client";
import React, { useState } from "react";
import { CartFood, NewFoodType } from "@/lib/type";
import Image from "next/image";
import { Button } from "@/components/ui";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FoodCardDetails } from "@/app/_components";
import { toast } from "sonner";

export const FoodCard = ({ filteredFood }: { filteredFood: NewFoodType }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();

  const handleAddSingleFoodToCart = (filteredFood: NewFoodType) => {
    // get from localstorage
    const cartFoods: CartFood[] = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );

    const existingFood = cartFoods.find(
      (cartFood) => cartFood.food._id === filteredFood._id
    );
    if (existingFood) {
      existingFood.quantity = existingFood.quantity + 1;
    } else {
      cartFoods.push({ food: filteredFood, quantity: 1 });
    }

    // save to localstorage
    localStorage.setItem("cartFoods", JSON.stringify(cartFoods));
    toast("Food is being added to the cart!");
    setIsDisabled(true);
  };

  return (
    <div className="w-[397.3px] p-4 rounded-[20px] flex flex-col gap-5 bg-background">
      <div className="w-full h-[210px] rounded-xl relative overflow-hidden">
        {filteredFood.image ? (
          <Image
            src={filteredFood.image}
            alt=""
            width={365.3}
            height={210}
            className="object-cover w-full h-full absolute"
            unoptimized
          />
        ) : (
          ""
        )}

        <div
          onClick={() => {
            handleAddSingleFoodToCart(filteredFood);
          }}
          className="absolute z-50 ml-[301.3px] mt-[146px]"
        >
          <Button
            disabled={isDisabled}
            variant={"outline"}
            className={`size-11 rounded-full ${
              isDisabled &&
              "bg-primary text-[#E4E4E7] border-none hover:bg-primary/20 hover:text-[#E4E4E7]"
            }`}
          >
            <FaPlus
              size={16}
              className={`text-red-500 ${isDisabled && "hidden"}`}
            />
            <FaCheck size={16} className={`${!isDisabled && "hidden"}`} />
          </Button>
        </div>
      </div>

      <FoodCardDetails filteredFood={filteredFood} />
    </div>
  );
};
