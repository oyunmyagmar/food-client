"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CartFood } from "@/lib/type";
import { Separator, Button } from "@/components/ui";

export const CartFoodCardComp = ({
  cartFoods,
  cartFood,
  reloadFoods,
}: {
  cartFoods: CartFood[];
  cartFood: CartFood;
  reloadFoods: () => void;
}) => {
  const [quantity, setQuantity] = useState<number>(cartFood.quantity);

  const decrementCartFoodQuant = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      const updatedFoods = cartFoods.map((el) =>
        el.food._id === cartFood.food._id
          ? { ...el, quantity: newQuantity }
          : el
      );
      localStorage.setItem("cartFoods", JSON.stringify(updatedFoods));
      reloadFoods();
    }
  };

  const incrementCartFoodQuant = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    const updatedFoods = cartFoods.map((el) =>
      el.food._id === cartFood.food._id ? { ...el, quantity: newQuantity } : el
    );
    localStorage.setItem("cartFoods", JSON.stringify(updatedFoods));
    reloadFoods();
  };

  const deleteFoodFromCart = (id: string) => {
    const remainedFoods = cartFoods.filter(
      (cartFood) => cartFood.food._id !== id
    );
    localStorage.setItem("cartFoods", JSON.stringify(remainedFoods));
    reloadFoods();
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex gap-2.5">
        <div className="w-31 h-30 rounded-xl relative overflow-hidden">
          <Image
            src={cartFood.food.image}
            alt=""
            width={124}
            height={120}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2.5">
              <div className="flex-1">
                <div className="text-base leading-7 font-bold text-red-500">
                  {cartFood.food.foodName}
                </div>
                <div className="text-xs leading-4 text-foreground">
                  {cartFood.food.ingredients}
                </div>
              </div>

              <div
                onClick={() => deleteFoodFromCart(cartFood.food._id)}
                className="w-9 h-9 rounded-full border border-red-500 bg-white flex justify-center items-center"
              >
                <IoCloseOutline size={16} className="text-red-500" />
              </div>
            </div>

            <div className="flex justify-between text-foreground items-center">
              <div className="flex items-center gap-3">
                <Button
                  onClick={decrementCartFoodQuant}
                  variant={"ghost"}
                  className="size-9"
                >
                  <FiMinus size={16} />
                </Button>

                <div className="text-lg leading-7 font-semibold">
                  {quantity}
                </div>

                <Button
                  onClick={incrementCartFoodQuant}
                  variant={"ghost"}
                  className="size-9"
                >
                  <FiPlus size={16} />
                </Button>
              </div>

              <div className="text-base leading-7 font-bold">
                ${cartFood.food.price * quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="border-t border-dashed border-[#09090B]/50 bg-transparent" />
    </div>
  );
};
