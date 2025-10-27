"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, Button } from "@/components/ui";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { CartFood, NewFoodType } from "@/lib/type";
import { toast } from "sonner";

export const FoodCardDetails = ({
  filteredFood,
}: {
  filteredFood: NewFoodType;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrementQuantity = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
  };

  const handleIncrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleAddMultiFoodsToCart = (filteredFood: NewFoodType) => {
    const cartFoods: CartFood[] = JSON.parse(
      localStorage.getItem("cartFoods") ?? "[]"
    );
    const existingFood = cartFoods.find(
      (cartFood) => cartFood.food._id === filteredFood._id
    );
    if (existingFood) {
      existingFood.quantity += quantity;
    } else {
      cartFoods.push({ food: filteredFood, quantity: quantity });
    }
    localStorage.setItem("cartFoods", JSON.stringify(cartFoods));
    setOpen(false);
    toast("Food is being added to the cart!");
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

      <DialogContent className="sm:max-w-[826px] flex rounded-[20px] gap-6">
        <div className="w-1/2 h-91 relative rounded-xl overflow-hidden">
          {filteredFood.image && (
            <Image
              src={filteredFood.image}
              alt=""
              width={377}
              height={364}
              unoptimized
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <div className="w-1/2 flex flex-col gap-27">
          <div>
            <div className="flex justify-end">
              <Button
                variant={"outline"}
                className="size-9 rounded-full"
                onClick={() => setOpen(false)}
              >
                <IoCloseOutline size={16} />
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-3xl leading-9 font-semibold text-red-500">
                {filteredFood.foodName}
              </div>
              <div className="text-base leading-6 text-foreground">
                {filteredFood.ingredients}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="text-foreground">
                <div className="text-base leading-6">Total price</div>
                <div className="text-2xl leading-8 font-semibold">
                  ${filteredFood.price * quantity}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleDecrementQuantity()}
                  variant={"outline"}
                  className={`w-11 h-11 rounded-full border-foreground ${
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
                  className="size-11 rounded-full border-foreground"
                >
                  <FiPlus size={16} />
                </Button>
              </div>
            </div>

            <Button
              className="w-full rounded-full h-11 py-3"
              onClick={() => handleAddMultiFoodsToCart(filteredFood)}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
