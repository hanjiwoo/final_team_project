"use client";
import { typeOfShop } from "@/app/assets/types/types";
import { RootState } from "@/redux/config/configStore";
import { getShop } from "@/redux/modules/detailShopSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopCard from "./ShopCard";
import { nanoid } from "nanoid";

export default function GoodPrice() {
  const shops = useSelector((state: RootState) => state.allShops);
  const dispatch = useDispatch();
  const [searchedShops, setSearchedShops] = useState<typeOfShop[]>([]);

  const buttonClass =
    "bg-red-300 w-[70px] h-[70px] rounded-full hover:scale-105";

  const searchHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const textForSearch = e.currentTarget.innerText.substring(1);
    if (e.currentTarget.id === "price") {
      const filterdShops = shops
        .filter((shop: typeOfShop) => {
          if (shop.가격1 && shop.가격2 && shop.가격3) {
            return (
              shop.가격1 <= +textForSearch ||
              shop.가격2 <= +textForSearch ||
              shop.가격3 <= +textForSearch
            );
          }
          if (shop.가격1 && shop.가격2) {
            return shop.가격1 <= +textForSearch || shop.가격2 <= +textForSearch;
          }
          if (shop.가격1) {
            return shop.가격1 <= +textForSearch;
          }
        })
        .slice(0, 16);
      //   console.log(filterdShops);
      setSearchedShops(filterdShops);
      //   console.log(searchedShops);
    } else {
      const filterdShops = shops
        .filter((shop: typeOfShop) => {
          if (shop.업종.substring(0, 2)) {
            return shop.업종.substring(0, 2) === textForSearch.substring(0, 2);
          }
        })
        .slice(0, 16);
      //   console.log(filterdShops);
      setSearchedShops(filterdShops);
      //   console.log(searchedShops);
    }

    // console.log(e.currentTarget.innerText.substring(1), "벨류나 한번 봅세");
  };
  return (
    <>
      <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
        전국의 착한 가격 매장 모-음
      </h1>
      <h3 className="text-lg text-gray-300 font-semibold">
        따뜻한 마음들이 모인 곳은 어디일까요?
      </h3>
      <div className="flex justify-center gap-10">
        <button
          id="price"
          className={buttonClass}
          onClick={(e) => searchHandler(e)}
        >
          #5000
        </button>
        <button
          id="price"
          className={buttonClass}
          onClick={(e) => searchHandler(e)}
        >
          #8000
        </button>
        <button className={buttonClass} onClick={(e) => searchHandler(e)}>
          #한식
        </button>
        <button className={buttonClass} onClick={(e) => searchHandler(e)}>
          #일식
        </button>
        <button className={buttonClass} onClick={(e) => searchHandler(e)}>
          #중식
        </button>
        <button className={buttonClass} onClick={(e) => searchHandler(e)}>
          #양식
        </button>
      </div>
      <section className="w-[1000px] h-[1000px] mb-[100px] bg-orange-300 grid grid-cols-4 gap-4">
        {searchedShops.map((shop: typeOfShop) => {
          return (
            <React.Fragment key={nanoid()}>
              <ShopCard shop={shop} shops={searchedShops} />
            </React.Fragment>
          );
        })}
      </section>
    </>
  );
}
