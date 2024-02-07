"use client";
import React, { useEffect } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "@/redux/modules/detailShopSlice";
import MapTest from "./MapTest";
import spoon from "../../app/assets/images/icon/spoon_fork.png";
import place from "../../app/assets/images/icon/place.png";
import phone from "../../app/assets/images/icon/phone.png";
import menu from "../../app/assets/images/icon/menu.png";
import inquiry from "../../app/assets/images/icon/inquiry.png";
import beforeHeart from "../../app/assets/images/icon/heart_off.png";
import Ddabong from "../home/Ddabong";
import { useQuery } from "@tanstack/react-query";
import { typeOfShop } from "@/app/assets/types/types";
import { getGoodShop } from "../home/QueryFn";
import { getAllShops } from "@/redux/modules/allShops";
import { RootState } from "@/redux/config/configStore";

export default function Shopinfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  // const shop = useSelector((state: RootState) => state.detailShop);

  const { data: shops, isLoading } = useQuery({
    queryKey: ["allshops"],
    queryFn: () => {
      return getGoodShop().then((res: typeOfShop[]) => {
        const filteredRes = res.filter((shop) => {
          return (
            shop.업종.slice(0, 2) !== "기타" &&
            shop.업종.slice(0, 2) !== "이미" &&
            shop.업종.slice(0, 2) !== "목욕" &&
            shop.업종.slice(0, 2) !== "세탁"
          );
        });
        dispatch(getAllShops(filteredRes));
        return filteredRes;
      });
    }
  });
  const shop = shops?.find((shop) => {
    return shop.연락처 === id;
  });
  useEffect(() => {
    if (shop) {
      dispatch(getShop(shop));
    }
  }, [shop]);
  // useEffect(() => {
  //   if (window && localStorage.getItem("upso")) {
  //     const filteredshop = {
  //       가격1: localStorage.getItem("money1"),
  //       가격2:
  //         localStorage.getItem("money2") === "null"
  //           ? ""
  //           : localStorage.getItem("money2"),
  //       가격3:
  //         localStorage.getItem("money3") === "null"
  //           ? ""
  //           : localStorage.getItem("money3"),
  //       메뉴1: localStorage.getItem("menu1"),
  //       메뉴2:
  //         localStorage.getItem("menu2") === "null"
  //           ? ""
  //           : localStorage.getItem("menu2"),
  //       메뉴3:
  //         localStorage.getItem("menu3") === "null"
  //           ? ""
  //           : localStorage.getItem("menu3"),
  //       시군: localStorage.getItem("sigoon"),
  //       시도: localStorage.getItem("sido"),
  //       업소명: localStorage.getItem("upso"),
  //       업종: localStorage.getItem("upzong"),
  //       연락처: localStorage.getItem("phoneNum"),
  //       주소: localStorage.getItem("addr"),
  //     };

  //     dispatch(getShop(filteredshop));
  //   }
  // }, []);

  return (
    <div className="w-full flex-col items-center justify-center gap-[32px] mt-[60px] max-sm:mt-[32px]">
      <div className="justify-between items-center flex mb-[32px] w-full">
        <div className="text-neutral-800 text-[24px] font-semibold leading-[32px]">{shop?.업소명}</div>
        {/* <Image
					src={beforeHeart}
					alt="likeButtn"
					className="w-[32px] h-[32px]"
				/> */}
        <div className=" cursor-pointer">
          <Ddabong type="normal" shopId={id} />
        </div>
      </div>
      <div className=" flex-col w-full justify-center gap-4 flex">
        <div className="items-center gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image width={100} height={100} className="w-6 h-6" src={spoon} alt="숟가락"></Image>
            <div className=" text-neutral-800 text-base font-semibold">업종</div>
          </div>
          <div className=" text-zinc-600 text-base font-medium">{shop?.업종}</div>
        </div>
        <div className="items-center gap-[16px] flex max-sm:items-start">
          <div className="items-center gap-2 flex justify-center">
            <Image width={100} height={100} className="w-6 h-6" src={place} alt="위치"></Image>
            <div className=" text-neutral-800 text-base font-semibold max-sm:w-[35px]">위치</div>
          </div>
          <div className=" text-zinc-600 text-base font-medium">{shop?.주소}</div>
        </div>
        <div className="items-center gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image width={100} height={100} className="w-6 h-6" src={phone} alt="번호"></Image>
            <div className="text-neutral-800 text-base font-semibold">전화번호</div>
          </div>
          <div className=" text-zinc-600 text-base font-medium">{shop?.연락처}</div>
        </div>
        <div className="items-start gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image width={100} height={100} className="w-6 h-6" src={menu} alt="메뉴"></Image>
            <div className="text-neutral-800 text-base font-semibold">주요메뉴</div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 ">
            <div className="flex gap-2 ">
              <div className="text-zinc-600 text-base font-medium">{shop?.메뉴1}</div>
              <div className="text-zinc-600 text-base font-medium">{shop?.가격1}</div>
            </div>
            <div className="flex gap-2 ">
              <div className="text-zinc-600 text-base font-medium">{shop?.메뉴2}</div>
              <div className="text-zinc-600 text-base font-medium">{shop?.가격2}</div>
            </div>
          </div>
        </div>
        <div className="items-start gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image width={100} height={100} className="w-6 h-6" src={inquiry} alt="문의하기"></Image>
            <div className="text-neutral-800 text-base font-semibold">문의하기</div>
          </div>
          <div className="text-orange-400 text-base font-medium">폐업신고 및 가격변동</div>
        </div>
      </div>
    </div>
  );
}
