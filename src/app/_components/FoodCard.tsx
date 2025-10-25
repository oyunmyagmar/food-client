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
  const [foodAdded, setFoodAdded] = useState<boolean>(false);
  const router = useRouter();

  const handleAddSingleFoodToCart = (filteredFood: NewFoodType) => {
    // get from localstorage
    const cartFoods: CartFood[] = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );

    cartFoods.push({ food: filteredFood, quantity: 1 });
    // save to localstorage
    localStorage.setItem("cartFoods", JSON.stringify(cartFoods));

    toast("Food is being added to the cart!");
    setFoodAdded(true);
    router.push("/");
  };

  return (
    <div className="w-[397.3px] p-4 rounded-[20px] flex flex-col gap-5 bg-background">
      <div className="w-full h-[210px] rounded-xl relative overflow-hidden">
        <div className="absolute">
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

        <div
          onClick={() => handleAddSingleFoodToCart(filteredFood)}
          className="absolute z-50 ml-[301.3px] mt-[146px]"
        >
          <Button
            disabled={foodAdded}
            variant={"outline"}
            className={`size-11 rounded-full ${
              foodAdded && "bg-primary border-none hover:bg-primary"
            }`}
          >
            <FaPlus
              size={16}
              className={`text-red-500 ${foodAdded && "hidden"}`}
            />
            <FaCheck size={16} className={`${!foodAdded && "hidden"}`} />
          </Button>
        </div>
      </div>

      <FoodCardDetails filteredFood={filteredFood} />
    </div>
  );
};
