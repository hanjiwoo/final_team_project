"use client";
import React from "react";
import Ddabong from "./Ddabong";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getShop } from "@/redux/modules/detailShopSlice";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";

export default function ShopCard({
  shop,
  shops,
}: {
  shop: typeOfShop;
  shops: typeOfShop[];
}) {
  const dispatch = useDispatch();
  // const shops = useSelector((state: any) => state.shops);
  const router = useRouter();

  const moveDetailPageBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    phoneNum: string
  ) => {
    // console.log(router);

    const detailshop = shops.find((shop: typeOfShop) => {
      return shop.연락처 === phoneNum;
    });
    if (!detailshop?.연락처) return alert("상세페이지가 없는 매장입니다.");
    dispatch(getShop(detailshop));
    router.push(`/detail/${phoneNum}`);
  };

  return (
    <>
      <section className="p-4  m-px w-1/16 bg-yellow-300" key={nanoid()}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <div className="text-base font-medium text-indigo-400 mb-1 flex">
            {shop.업소명}
          </div>{" "}
          <button
            className="hover:bg-orange-400 hover:text-white
                         transition duration-300 ease-in"
            onClick={(e) => moveDetailPageBtn(e, shop.연락처)}
          >
            상세페이지로
          </button>
          <div className="flex">
            <div className="text-base font-medium text-indigo-400 mb-1">
              {shop.업종}
            </div>
            <Ddabong name="thumbup" shopId={shop.연락처} type="small" />
          </div>
        </div>
      </section>
    </>
  );
}
