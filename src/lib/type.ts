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
  _id?: string;
  food: NewFoodType;
  quantity: number;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  phonenumber?: string;
  address: string;
  role: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UserOrderType = {
  _id: string;
  userId: UserType;
  totalPrice: number;
  foodOrderItems: CartFood[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
};
