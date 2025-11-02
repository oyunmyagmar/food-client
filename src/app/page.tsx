"use client";
import Image from "next/image";
import React from "react";
import { ClientLayout, FoodCard } from "@/app/_components";
import { useFood } from "./_hooks/use-food";

const Homepage = () => {
  const { loading, categories, foods, reFetchCategories, reFetchNewFoods } =
    useFood();

  return (
    <ClientLayout>
      <div className="w-360 flex flex-col items-center gap-22">
        <div className="w-full h-[570px] relative">
          <Image
            src="/hero.png"
            fill
            alt="hero image"
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full px-22 text-white flex flex-col gap-[54px]">
          {categories?.map((category) => {
            return (
              <div key={category._id} className="flex flex-col gap-[54px]">
                <div className="text-3xl leading-9 font-semibold">
                  {category.categoryName}
                </div>

                <div className="flex flex-wrap gap-9">
                  {foods
                    .filter((food) => food.categoryId?._id === category._id)
                    .map((filteredFood) => (
                      <FoodCard
                        key={filteredFood._id}
                        filteredFood={filteredFood}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientLayout>
  );
};
export default Homepage;
