"use client";

import React from "react";
import Image from "next/image";
import { ClientLayout, FoodCard } from "@/app/_components";
import { useFood } from "./_hooks/use-food";
import { Skeleton } from "@/components/ui";

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
          {loading && (
            <>
              {Array.from({ length: 4 }).map((el, i) => (
                <div key={i} className="flex flex-col gap-[54px]">
                  <Skeleton className="w-40 h-9 rounded-full" />

                  <div className="flex flex-wrap gap-9">
                    {Array.from({ length: 6 }).map((el, i) => (
                      <Skeleton
                        key={i}
                        className="w-[397.3px] h-[342px] rounded-[20px]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

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
