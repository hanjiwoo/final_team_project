"use client";
import React, { useEffect } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import phica from "../../app/assets/images/피카츄.jpg";
// import { getShop } from "@/redux/modules/detailShopSlice";
import MapTest from "./MapTest";

export default function TestPage() {
  const router = useRouter();

  const { id } = useParams();
  const shop = useSelector((state: any) => state.share);
  // console.log(shop, "이거 샵이양");
  // const dispatch = useDispatch();
  // console.log(shops);

  // useEffect(() => {
  //   const detailshop = shops.find((shop: typeOfShop) => {
  //     return shop.연락처 === id;
  //   });

  //   dispatch(getShop(detailshop));
  // }, []);
  // console.log(detailshop);

  return (
    <div className="bg-pink-100  h-[600px] flex flex-col">
      {/* <MapTest /> */}
      <Image src={phica} alt="착한가게사진"></Image>
      <div>
        {shop.id}
        {shop.가격1}
      </div>
      <div>
        {shop.category2}
        {shop.가격2}
      </div>
      <div>{shop.url}</div>
      <div>{shop.roadAddr}</div>
      <div>{shop.shopName}</div>
      <div>{shop.category}</div>
      <div>{shop.phone}</div>
      <div>{shop.address}</div>
    </div>
  );
}
