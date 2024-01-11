"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeOfShop } from "@/app/assets/types/types";
import { getShop } from "@/redux/modules/detailShopSlice";
import Ddabong from "./Ddabong";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ShopList() {
  const shops = useSelector((state: any) => state.shop);
  const dispatch = useDispatch();
  // console.log(shops, " 일단 레절트");
  const router = useRouter();

  const moveDetailPageBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    phoneNum: string
  ) => {
    // console.log(router);
    router.push(`/detail/${phoneNum}`);
    const detailshop = shops.find((shop: typeOfShop) => {
      return shop.연락처 === phoneNum;
    });

    dispatch(getShop(detailshop));
    // console.log(detailshop);
  };

  return (
    <>
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
            내 주변의 모-음은 어디일까요?
          </h1>
          <div>현재 "위치" 기준이에요.</div>
        </div>

        <div className="flex flex-wrap -m-4">
          {shops.map((shop: typeOfShop) => {
            return (
              <section className="p-4 sm:w-1/2 lg:w-1/4" key={shop.연락처}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <div className="text-base font-medium text-indigo-400 mb-1">
                    {shop.업소명}
                  </div>
                  <div className="text-base font-medium text-indigo-400 mb-1">
                    {shop.업종}
                  </div>
                  <div className="flex">
                    <button
                      className="p-6 hover:bg-orange-400 hover:text-white
                         transition duration-300 ease-in"
                      onClick={(e) => moveDetailPageBtn(e, shop.연락처)}
                    >
                      상세페이지로
                    </button>
                    <Ddabong name="thumbup" shopId={shop.연락처} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
