import React from "react";
import Image from "next/image";

export const FoodCardDetailsImage = ({
  filteredFoodImage,
}: {
  filteredFoodImage: string;
}) => {
  return (
    <div className="w-1/2 h-91 relative rounded-xl overflow-hidden">
      {filteredFoodImage && (
        <Image
          src={filteredFoodImage}
          alt=""
          fill
          unoptimized
          className="object-cover"
        />
      )}
    </div>
  );
};
