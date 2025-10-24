"use client";
import { useData } from "@/app/_providers/FoodProvider";
import React from "react";

const Testpage = () => {
  const { foods, categories } = useData();
  return (
    <div className="w-full h-100">
      {foods.map((el) => (
        <div>{el.foodName}</div>
      ))}
    </div>
  );
};
export default Testpage;
