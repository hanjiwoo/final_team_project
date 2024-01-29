import { typeOfShop } from "@/app/assets/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import 한식 from "../../app/assets/images/foodIcons/Korea.png";
import 중식 from "../../app/assets/images/foodIcons/China.png";
import 일식 from "../../app/assets/images/foodIcons/Japan.png";
import 양식 from "../../app/assets/images/foodIcons/USA.png";

export default function PhotoOfShop({ shop, type }: { shop: typeOfShop; type?: string }) {
  const upzong = shop.업종.slice(0, 2);
  let 이미지 = 한식;
  switch (upzong) {
    case "한식":
      이미지 = 한식;
      break;
    case "일식":
      이미지 = 일식;
      break;
    case "중식":
      이미지 = 중식;
      break;
    case "양식":
      이미지 = 양식;
      break;
  }

  return (
    <div
      className={`w-${
        type === "best" ? "[344px]" : "[252px]"
      } h-[252px] flex justify-center items-center bg-[#FFF2EC] rounded-[12px] mb-[20px]`}
    >
      <Image
        src={이미지}
        alt="음식사진"
        className={`w-${type === "map" ? "[30px]" : "[60px]"} h-${type === "map" ? "[22px]" : "[72px]"}`}
      />
    </div>
  );
}
