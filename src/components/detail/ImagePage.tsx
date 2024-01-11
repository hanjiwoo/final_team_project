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
    <div className="flex flex-row rounded-lg justify-center items-center bg-green-300 w-[800px] h-[600px] gap-5">
      <div className="bg-yellow-300 w-[550px] h-[550px] overflow-hidden rounded-lg">
        <Image className="w-full h-full" src={phica} alt="착한가게사진"></Image>
      </div>

      <div className="bg-blue-100 flex flex-col justify-center items-center gap-5">
        <Image
          className="w-[170px] h-[170px]"
          src={phica}
          alt="착한가게사진"
        ></Image>
        <Image
          className="w-[170px] h-[170px]"
          src={phica}
          alt="착한가게사진"
        ></Image>
        <Image
          className="w-[170px] h-[170px]"
          src={phica}
          alt="착한가게사진"
        ></Image>
      </div>
    </div>
  );
}
