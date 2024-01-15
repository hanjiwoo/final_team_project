"use client";
import React, { useEffect } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import phica from "../../app/assets/images/피카츄.jpg";
import { getShop } from "@/redux/modules/detailShopSlice";
import MapTest from "./MapTest";
import Ddabong from "../home/Ddabong";

export default function Shopinfo() {
  const router = useRouter();
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (window && localStorage.getItem("upso")) {
      const filteredshop = {
        가격1: localStorage.getItem("money1"),
        가격2:
          localStorage.getItem("money2") === "null"
            ? ""
            : localStorage.getItem("money2"),
        가격3:
          localStorage.getItem("money3") === "null"
            ? ""
            : localStorage.getItem("money3"),
        메뉴1: localStorage.getItem("menu1"),
        메뉴2:
          localStorage.getItem("menu2") === "null"
            ? ""
            : localStorage.getItem("menu2"),
        메뉴3:
          localStorage.getItem("menu3") === "null"
            ? ""
            : localStorage.getItem("menu3"),
        시군: localStorage.getItem("sigoon"),
        시도: localStorage.getItem("sido"),
        업소명: localStorage.getItem("upso"),
        업종: localStorage.getItem("upzong"),
        연락처: localStorage.getItem("phoneNum"),
        주소: localStorage.getItem("addr"),
      };

      dispatch(getShop(filteredshop));
    }
  }, []);

  return (
    <div className="bg-blue-100 gap-0.5 h-[200px] pl-[15px] flex flex-col justify-center">
      <p className="flex">
        {" "}
        <h1 className="text-4xl font-black">{shop.업소명} </h1>
        <Ddabong name="thumbup" shopId={id} type="normal" />
      </p>
      <p>업종 {shop.업종}</p>
      <div>위치 {shop.주소}</div>
      <div>전화번호 {shop.연락처}</div>
      <div className="flex">
        주요메뉴
        <section className="flex flex-col">
          {" "}
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
          </div>{" "}
        </section>
      </div>
    </div>
  );
}
