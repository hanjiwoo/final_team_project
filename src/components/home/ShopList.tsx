"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeOfShop } from "@/app/assets/types/types";
import { getShop } from "@/redux/modules/detailShopSlice";
import Ddabong from "./Ddabong";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShopCard from "./ShopCard";
import { nanoid } from "nanoid";
import { RootState } from "@/redux/config/configStore";
import { useRouter } from "next/navigation";

export default function ShopList() {
  const shops = useSelector((state: RootState) => state.shops);
  const dispatch = useDispatch();
  // console.log(shops, " 일단 레절트");
  const [slide, setSlide] = useState<number>(0);
  const router = useRouter();

  // console.log(Math.ceil(shops.length / 4), "길이 알아보자");

  const rigthMove = () => {
    if (Math.ceil((shops.length / 4) * 1000) + slide - 1500 <= 0) return;
    // console.log(Math.ceil(shops.length / 4) * 1000, "흐음", slide);
    setSlide(slide - 500);
  };
  const leftMove = () => {
    if (slide >= 0) return;
    setSlide(slide + 500);
  };

  const moveToFullMap = () => {
    router.push("/map");
  };
  return (
    <>
      <div className="container  py-10  bg-red-300 w-full overflow-hidden">
        <div className="text-center mb-12 bg-blue-200">
          <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
            내 주변의 모-음은 어디일까요?
          </h1>
          <div>
            {shops[0]?.시도 === "" ? (
              <div>검색 부탁드려요 </div>
            ) : (
              <div>
                현재 🔻{shops[0]?.시도} {shops[0]?.시군} 기준이에요.
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "green",
            width: `${Math.ceil(shops.length / 4) * 1000}px`,
            transform: `translate(${slide}px)`,
            transition: "transform 0.5s",
            display: "flex",
          }}
        >
          {shops.map((shop: typeOfShop) => {
            return (
              <React.Fragment key={nanoid()}>
                <ShopCard shop={shop} shops={shops} />
              </React.Fragment>
            );
          })}
        </div>{" "}
        <section className="flex bg-blue-300 justify-around">
          <button
            className="bg-purple-300 rounded-full text-4xl hover:scale-110"
            onClick={leftMove}
          >
            👈
          </button>
          <button
            className="bg-purple-300 rounded-full text-4xl hover:scale-110"
            onClick={rigthMove}
          >
            👉
          </button>
          {shops[0] && (
            <button
              onClick={moveToFullMap}
              className="bg-orange-500 w-[50px] h-[50px] rounded-full absolute top-[1000px] right-[100px] hover:scale-105"
            >
              맵보러가기
            </button>
          )}
        </section>
      </div>
    </>
  );
}
