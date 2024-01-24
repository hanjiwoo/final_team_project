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
export default function ShopCard({
  shop,
  shops,
  type,
}: {
  shop: typeOfShop;
  shops?: typeOfShop[];
  type?: string;
}) {
  const dispatch = useDispatch();
  // const shops = useSelector((state: any) => state.shops);
  const router = useRouter();
  const [addr, setAddr] = useState({ addrRoad: "", addrBuilding: "" });
  const moveDetailPageBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    phoneNum: string
  ) => {
    // console.log(router);

    // const detailshop = shops.find((shop: typeOfShop) => {
    //   return shop.연락처 === phoneNum;
    // });
    if (!shop?.연락처) return alert("상세페이지가 없는 매장입니다.");
    dispatch(getShop(shop));
    router.push(`/detail/${shop.연락처}`);
  };
  useEffect(() => {
    if (window.kakao) {
      let geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(shop.주소, function (result, status) {
        // console.log(
        //   result[0].address_name,
        //   result[0].road_address.building_name,
        //   "이것좀봅세"
        // );
        if (result[0]) {
          setAddr({
            addrRoad: result[0].address_name,
            addrBuilding: result[0].road_address.building_name,
          });
        }
      });

      // const ps = new window.kakao.maps.services.Places();
      // ps.keywordSearch("라페스타", function (result, status) {
      //   console.log(result, "이것좀봅세2");
      // });
    }
  }, []);
  return (
    <button onClick={(e) => moveDetailPageBtn(e, shop.연락처)}>
      <section
        className="flex w-[344px] bg-[#fff] rounded-lg justify-center items-center"
        key={nanoid()}
      >
        <div className="h-full border-opacity-60 rounded-lg ">
          <div className="w-[344px] h-[252px] bg-[#F1F1F1] rounded-[12px] mb-[20px]" />
          <div className="font-medium text-[#212121] mb-1 flex text-xl">
            {shop.업소명}
          </div>
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
            <Image src={place} alt="위치" className="w-[20px] h-[20px]" />
            {addr.addrRoad} {addr.addrBuilding && addr.addrBuilding}
          </div>
          {/* </div> */}
        </div>
      </section>
    </button>
  );
}
