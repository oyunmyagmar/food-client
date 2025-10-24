"use client";
import { CategoryType, NewFoodType } from "@/lib/type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type FoodContextType = {
  foods: NewFoodType[];
  categories: CategoryType[];
};
export const FoodContext = createContext<FoodContextType>(
  {} as FoodContextType
);

export const FoodProvider = ({ children }: Props) => {
  const [foods, setFoods] = useState<NewFoodType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategories = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:4000/api/categories");
    const resData = await res.json();
    const { data } = resData;
    // console.log(data, "Categories");
    setCategories(data);
    setLoading(false);
  };

  const getNewFoods = async () => {
    setLoading(true);
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
    <FoodContext.Provider value={{ foods, categories }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useData = () => {
  return useContext(FoodContext);
};
