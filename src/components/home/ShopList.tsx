"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeOfShop } from "@/app/assets/types/types";
import ShopCard from "./ShopCard";
import { nanoid } from "nanoid";
import { RootState } from "@/redux/config/configStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import place from "../../app/assets/images/icon/place.png";
import map from "../../app/assets/images/icon/map.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ShopList() {
  const shops = useSelector((state: RootState) => state.shops);
  const dispatch = useDispatch();
  // console.log(shops, " 일단 레절트");
  const [slide, setSlide] = useState<number>(0);
  const router = useRouter();

  // console.log(Math.ceil(shops.length / 4), "길이 알아보자");

  // const rigthMove = () => {
  //   if (Math.ceil((shops.length / 4) * 1000) + slide - 1500 <= 0) return;
  //   // console.log(Math.ceil(shops.length / 4) * 1000, "흐음", slide);
  //   setSlide(slide - 500);
  // };
  // const leftMove = () => {
  //   if (slide >= 0) return;
  //   setSlide(slide + 500);
  // };

  const moveToFullMap = () => {
    router.push("/map");
  };

  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <>
      <div className="container  py-[40px] w-full relative">
        <div className="text-center mb-12">
          <h1 className="text-[28px] text-[#212121] font-semibold leading-[36px] mb-[12px]">
            내 주변의 모-음은 어디일까요?
          </h1>
          <div className="mb-[60px]">
            {shops[0]?.시도 === "" ? (
              <div> 검색이 필요해요</div>
            ) : (
              <div className="flex justify-center gap-2 font-[18px] leading-[26px]">
                현재
                <Image
                  src={place}
                  alt="위치마크"
                  className="w-[24px] h-[24px]"
                />
                <p className="font-bold text-[18px] leading-[26px]">
                  {shops[0]?.시도} {shops[0]?.시군}
                </p>
                기준이에요
              </div>
            )}
          </div>
        </div>
        <div className="swiper-container">
          <Swiper
            loop={true} // 슬라이드 루프
            spaceBetween={50} // 슬라이스 사이 간격
            slidesPerView={4} // 보여질 슬라이스 수
            navigation={true} // prev, next button
            autoplay={{
              delay: 3500,
              disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
            }}
          >
            {shops.map((shop: typeOfShop) => {
              return (
                <React.Fragment>
                  <SwiperSlide key={nanoid()}>
                    <ShopCard shop={shop} shops={shops} />
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
          </Swiper>
        </div>
        <section className="flex bg-blue-300 justify-around">
          {/* <button
						className="bg-purple-300 rounded-full text-4xl hover:scale-110 absolute top-[200px] left-[-60px]"
						onClick={leftMove}
					>
						👈
					</button>
					<button
						className="bg-purple-300 rounded-full text-4xl hover:scale-110 absolute top-[200px] right-[-60px]"
						onClick={rigthMove}
					>
						👉
					</button> */}
          {shops[0] && (
            <button
              onClick={moveToFullMap}
              className="w-[52px] h-[52px] bg-[#ff8145] rounded-full shadow hover:scale-105 fixed bottom-[14px] right-[14px] z-[100]"
            >
              <Image
                className="w-10 h-10 p-[2.50px] justify-center items-center inline-flex"
                src={map}
                alt="지도"
              ></Image>
            </button>
          )}
        </section>
      </div>
    </>
  );
}
