export type CategoryType = {
  _id: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewFoodType = {
  _id: string;
  foodName: string;
  price: number;
  categoryId: CategoryType;
  ingredients: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CartFood = {
  food: NewFoodType;
  quantity: number;
};
