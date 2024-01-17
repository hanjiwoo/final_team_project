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
    "border-[1.5px] bg-[#fff] border-[#E1E1E1] w-[68px] h-[68px] rounded-full hover:scale-105 cursor-pointer";

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
      <div className="text-center mb-12">
        <h1 className="text-[28px] leading-[36px] text-[#212121] font-semibold mb-[12px]">
          전국의 착한 가격 매장 모-음
        </h1>
        <span className="text-[18px] leading-[20px] font-[#5c5c5c]">
          따뜻한 마음들이 모인 곳은 어디일까요?
        </span>
      </div>
      <div className="flex justify-center gap-10 mb-[60px]">
        <div className="flex flex-col items-center gap-[8px]">
          <button
            id="price"
            className={buttonClass}
            onClick={(e) => searchHandler(e)}
          >
            #5000
          </button>
          {/* <span>#5000</span> */}
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button
            id="price"
            className={buttonClass}
            onClick={(e) => searchHandler(e)}
          >
            #8000
          </button>
          {/* <span>#8000</span> */}
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} onClick={(e) => searchHandler(e)}>
            #한식
          </button>
          {/* <span>#한식</span> */}
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} onClick={(e) => searchHandler(e)}>
            #일식
          </button>
          {/* <span>#일식</span> */}
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} onClick={(e) => searchHandler(e)}>
            #중식
          </button>
          {/* <span>#중식</span> */}
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} onClick={(e) => searchHandler(e)}>
            #양식
          </button>
          {/* <span>#양식</span> */}
        </div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-[24px] mb-[80px]">
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
