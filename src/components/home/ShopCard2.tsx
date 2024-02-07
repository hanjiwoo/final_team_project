"use client";
import React, { useEffect, useRef, useState } from "react";
import Ddabong from "./Ddabong";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getShop } from "@/redux/modules/detailShopSlice";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import Image from "next/image";
import place from "../../app/assets/images/icon/place.png";
import spoon_fork from "../../app/assets/images/icon/spoon_fork.png";
import { toast } from "react-toastify";
import PhotoOfShop from "./PhotoOfShop";
import { useQuery } from "@tanstack/react-query";
export default function ShopCard({ shop, shops, type }: { shop: typeOfShop; shops?: typeOfShop[]; type?: string }) {
  const dispatch = useDispatch();
  // const shops = useSelector((state: any) => state.shops);
  const router = useRouter();
  // const [addr, setAddr] = useState({ addrRoad: "", addrBuilding: "" });
  const moveDetailPageBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, phoneNum: string) => {
    // console.log(router);

    // const detailshop = shops.find((shop: typeOfShop) => {
    //   return shop.연락처 === phoneNum;
    // });
    if (!shop?.연락처) return toast.warning("상세페이지가 없는 매장입니다.");
    dispatch(getShop(shop));
    router.push(`/detail/${shop.연락처}`);
  };

  return (
    <button onClick={(e) => moveDetailPageBtn(e, shop.연락처)}>
      <section className="flex w-[344px] bg-[#fff] rounded-lg justify-center items-center" key={nanoid()}>
        <div className="h-full border-opacity-60 rounded-lg ">
          {/* <div className="w-[344px] h-[252px] bg-[#F1F1F1] rounded-[12px] mb-[20px]" /> */}
          <PhotoOfShop shop={shop} type="best" />
          <div className="font-medium text-[#212121] mb-1 flex text-xl">{shop.업소명}</div>
          <div className="flex justify-between">
            <Ddabong name="thumbup" shopId={shop.연락처} type="small" />
          </div>
          {/* <div className="flex justify-round gap-5"> */}
          {/* <div className="flex gap-1 text-[12px] text-[#5C5C5C] mb-1 items-center">
            <Image
              src={spoon_fork}
              alt="스푼포크"
              className="w-[20px] h-[20px]"
            />
            {shop.업종}
          </div> */}
          <div className="flex gap-1 text-[12px] text-[#5C5C5C] mb-1 items-center">
            <Image width={100} height={100} src={place} alt="위치" className="w-[20px] h-[20px]" />
            {shop.주소}
          </div>
          {/* </div> */}
        </div>
      </section>
    </button>
  );
}
