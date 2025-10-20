import React from "react";
import { NewFoodType } from "@/lib/type";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

export const FoodCard = ({ filteredFood }: { filteredFood: NewFoodType }) => {
  console.log(filteredFood.image);
  return (
    <div className="w-[397.3px] p-4 rounded-[20px] flex flex-col gap-5 bg-background">
      <div className="w-[365.3px] h-[210px] rounded-xl relative overflow-hidden">
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

        <div className="absolute z-50">
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"}></Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="absolute text-red-600 z-30"></div>
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
