"use client";
import { typeOfShop } from "@/app/assets/types/types";
import { RootState } from "@/redux/config/configStore";
import { getShop } from "@/redux/modules/detailShopSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopCard from "./ShopCard";
import { nanoid } from "nanoid";
import Image from "next/image";
import money1 from "../../app/assets/images/icon/money_1.png";
import money2 from "../../app/assets/images/icon/money_2.png";
import korean from "../../app/assets/images/icon/korean_food.png";
import japanese from "../../app/assets/images/icon/japanese_food.png";
import chinese from "../../app/assets/images/icon/chinese_food.png";
import american from "../../app/assets/images/icon/american_food.png";

export default function GoodPrice() {
  const shops = useSelector((state: RootState) => state.allShops);
  const dispatch = useDispatch();
  const [searchedShops, setSearchedShops] = useState<typeOfShop[]>([]);
  function shuffleArray(array: typeOfShop[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const searchHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const textForSearch = e.currentTarget.value;
    if (e.currentTarget.id === "price") {
      // console.log(e.currentTarget.value, "벨류한번만 찍어봅세");
      const filterdShops = shops.filter((shop: typeOfShop) => {
        if (shop.가격1 && shop.가격2 && shop.가격3) {
          return shop.가격1 <= +textForSearch || shop.가격2 <= +textForSearch || shop.가격3 <= +textForSearch;
        }
        if (shop.가격1 && shop.가격2) {
          return shop.가격1 <= +textForSearch || shop.가격2 <= +textForSearch;
        }
        if (shop.가격1) {
          return shop.가격1 <= +textForSearch;
        }
      });
      const randomArray = shuffleArray(filterdShops).slice(0, 16);

      setSearchedShops(randomArray);
    } else {
      // console.log(e.currentTarget.value, "벨류한번만 찍어봅세");
      const filterdShops = shops.filter((shop: typeOfShop) => {
        if (shop.업종.substring(0, 2)) {
          return shop.업종.substring(0, 2) === textForSearch.substring(0, 2);
        }
      });
      const randomArray = shuffleArray(filterdShops).slice(0, 16);

      setSearchedShops(randomArray);
    }

    // console.log(e.currentTarget.innerText.substring(1), "벨류나 한번 봅세");
  };
  const buttonStyle = "flex flex-col items-center gap-[8px]";
  const buttonClass =
    "border-[1.5px] bg-[#fff] border-[#E1E1E1] w-[68px] h-[68px] justify-center items-center gap-1 inline-flex rounded-full hover:scale-105 hover:border-[#ff8145] cursor-pointer";
  useEffect(() => {
    const textForSearch = "5000";
    const filterdShops = shops.filter((shop: typeOfShop) => {
      if (shop.가격1 && shop.가격2 && shop.가격3) {
        return shop.가격1 <= +textForSearch || shop.가격2 <= +textForSearch || shop.가격3 <= +textForSearch;
      }
      if (shop.가격1 && shop.가격2) {
        return shop.가격1 <= +textForSearch || shop.가격2 <= +textForSearch;
      }
      if (shop.가격1) {
        return shop.가격1 <= +textForSearch;
      }
    });
    const randomArray = shuffleArray(filterdShops).slice(0, 16);

    setSearchedShops(randomArray);
  }, [shops]);
  return (
    <>
      <div className="text-center mb-12 mt-[60px]">
        <h1 className="text-[28px] leading-[36px] text-[#212121] font-semibold mb-[12px]">
          전국의 착한 가격 매장 모음
        </h1>
        <span className="text-[18px] leading-[20px] font-[#5c5c5c]">따뜻한 마음들이 모인 곳은 어디일까요?</span>
      </div>
      <div className=" gap-10 mb-[60px] grid grid-cols-3 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6">
        <div className="flex flex-col items-center gap-[8px]">
          <button id="price" className={buttonClass} value="5000" onClick={(e) => searchHandler(e)}>
            <Image width={100} height={100} className="w-8 h-8 " src={money1} alt="5000"></Image>
          </button>
          <span>#5000</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button id="price" className={buttonClass} value="8000" onClick={(e) => searchHandler(e)}>
            <Image width={100} height={100} className="w-8 h-8 " src={money2} alt="8000"></Image>
          </button>
          <span>#8000</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} value="한식" onClick={(e) => searchHandler(e)}>
            <Image width={100} height={100} className="w-8 h-8 " src={korean} alt="한식"></Image>
          </button>
          <span>#한식</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} value="일식" onClick={(e) => searchHandler(e)}>
            <Image width={100} height={100} className="w-8 h-8 " src={japanese} alt="일식"></Image>
          </button>
          <span>#일식</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} value="중식" onClick={(e) => searchHandler(e)}>
            <Image width={100} height={100} className="w-8 h-8 " src={chinese} alt="중식"></Image>
          </button>
          <span>#중식</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <button className={buttonClass} value="양식" onClick={(e) => searchHandler(e)}>
            <Image width={100} height={100} className="w-8 h-8 " src={american} alt="양식"></Image>
          </button>
          <span>#양식</span>
        </div>
      </div>
      <section className="grid max-md:flex max-md:w-full max-md:overflow-x-scroll max-sm:scrollbar-hide md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] mb-[80px] px-[20px]">
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
