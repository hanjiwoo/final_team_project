"use client";
import React, { useEffect } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import phica from "../../app/assets/images/피카츄.jpg";
import { getShop } from "@/redux/modules/detailShopSlice";

export default function Shopinfo() {
  const { id } = useParams();
  const shop = useSelector((state: any) => state.detailShop);
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
    <div className="bg-blue-100 w-[500px] h-[600px]">
      {" "}
      <Image src={phica} alt="착한가게사진"></Image>
      <div>
        {shop.메뉴1}
        {shop.가격1}
      </div>
      <div>
        {shop.메뉴2}
        {shop.가격2}
      </div>
      <div>
        {shop.메뉴3}
        {shop.가격3}
      </div>
      <div>{shop.업소명}</div>
      <div>{shop.업종}</div>
      <div>{shop.연락처}</div>
      <div>{shop.주소}</div>
    </div>
  );
}
