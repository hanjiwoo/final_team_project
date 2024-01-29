import { typeOfShop } from "@/app/assets/types/types";
import 한식 from "../../app/assets/images/icon/korean_food.png";
import 일식 from "../../app/assets/images/icon/japanese_food.png";
import 중식 from "../../app/assets/images/icon/chinese_food.png";
import 양식 from "../../app/assets/images/icon/american_food.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoOfShop({ shop }: { shop: typeOfShop }) {
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
  return <Image src={이미지} alt="음식사진" />;
}
