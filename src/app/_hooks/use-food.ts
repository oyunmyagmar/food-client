"use client";

import { CategoryType, NewFoodType } from "@/lib/type";
import { useEffect, useState } from "react";

export const useFood = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<NewFoodType[]>([]);

  const getCategories = async () => {
    setLoading(true);
    const res = await fetch(
      "https://food-next-backend.vercel.app/api/categories"
    );
    const resData = await res.json();
    const { data } = resData;

    setCategories(data);
    setLoading(false);
  };

  const getNewFoods = async () => {
    setLoading(true);
    const res = await fetch(
      "https://food-next-backend.vercel.app/api/newfoods"
    );
    const resData = await res.json();
    const { data } = resData;
    setFoods(data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
    getNewFoods();
  }, []);

  return {
    loading,
    categories,
    foods,
    reFetchCategories: getCategories,
    reFetchNewFoods: getNewFoods,
  };
};
