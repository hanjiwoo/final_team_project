"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeOfShop } from "@/app/assets/types/types";
import { getShop } from "@/redux/modules/detailShopSlice";
import Ddabong from "./Ddabong";

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
      {" "}
      샵리스트
      <div className="bg-orange-100 w-[600px] h-[100px] flex flex-col items-center gap-10">
        {shops.map((shop: typeOfShop) => {
          return (
            <section
              key={shop.연락처}
              className="w-[800px] h-[150px] flex flex-col bg-red-100 "
            >
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
              <div className="flex">
                <button
                  className="bg-green-200 w-[100px]"
                  onClick={(e) => moveDetailPageBtn(e, shop.연락처)}
                >
                  상세페이지로
                </button>
                <Ddabong name="thumbup" shopId={shop.연락처} />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
