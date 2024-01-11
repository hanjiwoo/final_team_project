import React, { useEffect } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import phica from "../../app/assets/images/피카츄.jpg";
// import { getShop } from "@/redux/modules/detailShopSlice";
import MapTest from "./MapTest";

export default function ImagePage() {
  return (
    <div className="w-1/2 h=full">
      <Image src={phica} alt="착한가게사진"></Image>
    </div>
  );
}
