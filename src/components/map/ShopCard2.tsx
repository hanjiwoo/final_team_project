"use client";
import React, { useEffect, useRef, useState } from "react";
import Ddabong from "../home/Ddabong";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getShop } from "@/redux/modules/detailShopSlice";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import Image from "next/image";
import place from "../../app/assets/images/icon/place.png";
import spoon_fork from "../../app/assets/images/icon/spoon_fork.png";
import { useQuery } from "@tanstack/react-query";
import { getHoogis } from "../detail/queryFns";
export default function ShopCard2({
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
    if (!shop?.연락처) return alert("상세페이지가 없는 매장입니다.");
    dispatch(getShop(shop));
    router.push(`/detail/${shop.연락처}`);
  };
  const { data: hoogis, isLoading } = useQuery({
    queryKey: [`hoogis${shop.연락처}`],
    queryFn: () => getHoogis(shop.연락처),
  });
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
    <>
      <section
        className="flex flex-row h-[200px] w-full bg-[#fff] rounded-lg justify-center items-center"
        key={nanoid()}
      >
        <div className="flex flex-row h-full border-opacity-60 rounded-lg ">
          <div className="w-[252px] h-full bg-[#F1F1F1] rounded-[12px] mb-[20px]" />
          <section>
            <div className="font-medium text-[#212121] mb-1 flex text-xl">
              {shop.업소명}
            </div>
            <div className="flex justify-between">
              {type === "no" ? (
                <></>
              ) : (
                <button
                  className="hover:bg-orange-400 hover:text-white transition duration-300 ease-in whitespace-nowrap"
                  onClick={(e) => moveDetailPageBtn(e, shop.연락처)}
                >
                  상세페이지로
                </button>
              )}
              <Ddabong name="thumbup" shopId={shop.연락처} type="small" />
              <p>후기 :{hoogis?.length}</p>
            </div>
            {/* <div className="flex justify-round gap-5"> */}
            <div className="flex gap-1 text-[14px] text-[#5C5C5C] mb-1 items-center">
              <Image src={spoon_fork} alt="위치" />
              {shop.업종}
            </div>
            <div className="flex gap-1 text-[12px] text-[#5C5C5C] mb-1 items-center">
              <Image src={place} alt="스푼포크" className="w-[20px] h-[20px]" />
              {addr.addrRoad} {addr.addrBuilding}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
