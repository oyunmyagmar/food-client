import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const LogImage = () => {
  const router = useRouter();

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        width={856}
        height={904}
        src="/login.jpg"
        alt="image"
        className="object-cover w-full h-full"
      />
    </div>
  );
};
