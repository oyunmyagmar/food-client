import React from "react";
import { NewFoodType } from "@/lib/type";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@/components/ui";
import { FaPlus } from "react-icons/fa6";

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

        <div className="absolute z-50 ml-[301.3px] mt-[146px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="size-11 rounded-full">
                <FaPlus size={16} className="text-red-500" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <Image src={""} alt="" />
              <DialogHeader>
                <DialogTitle>Sunshine Stackers</DialogTitle>
                <DialogDescription>
                  Fluffy pancakes stacked with fruits, cream, syrup, and
                  powdered sugar.
                </DialogDescription>
              </DialogHeader>
              <div>
                <div>Total price</div>
                <div>{"price"}</div>
              </div>
              <div>
                <Button>{"hasah"}</Button>
                <div>{"food too"}</div>
                <Button>{"nemeh"}</Button>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
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
