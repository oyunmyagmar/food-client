"use client";
import React, { useEffect, useState } from "react";
import { NewFoodType } from "@/lib/type";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, Button } from "@/components/ui";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export const FoodCard = ({ filteredFood }: { filteredFood: NewFoodType }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  // const [foodsAddedToCart, setFoodsAddedToCart] = useState<NewFoodType[]>([]);
  const foodsAddedToCart: NewFoodType[] = [];

  const handleAddFoodToCart = (filteredFood: NewFoodType) => {
    // alert(filteredFood._id);
    foodsAddedToCart.push(filteredFood);
    setAdded(true);
    alert("Food is being added to the cart!");
    localStorage.setItem("foodsAddedToCart", JSON.stringify(foodsAddedToCart));
  };

  const handleIncrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleDecrementQuantity = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
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

        <div className="absolute z-50 ml-[301.3px] mt-[146px]">
          <Button
            variant={"outline"}
            className={`size-11 rounded-full ${
              added && "bg-primary border-none hover:bg-primary"
            }`}
            onClick={() => handleAddFoodToCart(filteredFood)}
          >
            <FaPlus size={16} className={`text-red-500 ${added && "hidden"}`} />
            <FaCheck size={16} className={`${!added && "hidden"}`} />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
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
            <Image
              src={filteredFood.image}
              alt=""
              width={377}
              height={364}
              unoptimized
              className="object-cover w-full h-full"
            />
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
                    ${filteredFood.price}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleDecrementQuantity}
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

              <div>
                <Button className="w-full rounded-full h-11 py-3">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
