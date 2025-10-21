"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CategoryType, NewFoodType } from "@/lib/type";
import { ClientLayout, FoodCard } from "@/app/_components";

const Homepage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<NewFoodType[]>([]);

  const getCategories = async () => {
    const res = await fetch("http://localhost:4000/api/categories");
    const resData = await res.json();
    const { data } = resData;
    // console.log(data, "Categories");
    setCategories(data);
  };

  const getNewFoods = async () => {
    const res = await fetch("http://localhost:4000/api/newfoods");
    const resData = await res.json();
    const { data } = resData;
    // console.log(data, "foods");
    setFoods(data);
  };

  useEffect(() => {
    getCategories();
    getNewFoods();
  }, []);

  return (
    <ClientLayout>
      <div className="w-360 h-full flex flex-col items-center m-auto bg-[#404040]">
        <Image src="/hero.png" width={1440} height={570} alt="hero image" />

        <div className="p-22 text-white w-full flex flex-col gap-[54px]">
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
