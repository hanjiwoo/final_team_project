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
import { getHoogis } from "../detail/queryFns";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PhotoOfShop from "../home/PhotoOfShop";
export default function ShopCard2({ shop, shops, type }: { shop: typeOfShop; shops?: typeOfShop[]; type?: string }) {
  const dispatch = useDispatch();
  // const shops = useSelector((state: any) => state.shops);
  const router = useRouter();
  // const [addr, setAddr] = useState({ addrRoad: "", addrBuilding: "" });
  const moveDetailPageBtn = (event: React.MouseEvent<HTMLElement, MouseEvent>, phoneNum: string) => {
    // console.log(router);

    // const detailshop = shops.find((shop: typeOfShop) => {
    //   return shop.연락처 === phoneNum;
    // });
    if (!shop?.연락처) return toast.warning("상세페이지가 없는 매장입니다.");
    dispatch(getShop(shop));
    router.push(`/detail/${shop.연락처}`);
  };
  const { data: hoogis, isLoading } = useQuery({
    queryKey: [`hoogis${shop.연락처}`],
    queryFn: () => getHoogis(shop.연락처)
  });
  // useEffect(() => {
  //   if (window.kakao) {
  //     let geocoder = new window.kakao.maps.services.Geocoder();
  //     geocoder.addressSearch(shop.주소, function (result, status) {
  //       // console.log(
  //       //   result[0].address_name,
  //       //   result[0].road_address.building_name,
  //       //   "이것좀봅세"
  //       // );
  //       if (result[0]) {
  //         setAddr({
  //           addrRoad: result[0].address_name,
  //           addrBuilding: result[0].road_address.building_name ? result[0].road_address.building_name : ""
  //         });
  //       }
  //     });

  //     // const ps = new window.kakao.maps.services.Places();
  //     // ps.keywordSearch("라페스타", function (result, status) {
  //     //   console.log(result, "이것좀봅세2");
  //     // });
  //   }
  // }, []);
  return (
    <>
      <section
        className="flex gap-[20px] h-[148px] w-[400px] max-sm:w-full p-[20px] bg-[#fff] rounded-[16px] items-center hover:scale-[1.04] transition-transform ease duration-300"
        key={nanoid()}
        onClick={(e) => moveDetailPageBtn(e, shop.연락처)}
      >
        <section className="w-[100px] h-[100px] flex justify-center items-center rounded-[12px] overflow-hidden">
          {/* <div className="w-full h-full bg-[#F1F1F1] rounded-[12px]" /> */}
          <div className="flex justify-center items-center mt-[18px]">
            <PhotoOfShop shop={shop} type="map" />
          </div>
        </section>
        <section className="flex flex-col border-opacity-60 gap-[16px] ">
          <div className="text-[18px] font-semibold text-[#212121] leadding-[26px]">{shop.업소명}</div>
          {/* <div className="flex justify-between">
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
						</div> */}
          {/* <Ddabong name="thumbup" shopId={shop.연락처} type="small" /> */}
          {/* <div className="flex justify-round gap-5"> */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[4px] text-[14px] text-[#212121] text-semibold items-center">
              <Image width={100} height={100} src={spoon_fork} alt="위치" className=" w-[18px] h-[18px]" />
              {shop.업종}
            </div>
            {/* <p className="flex gap-[4px] text-[14px] text-[#212121] text-semibold items-center">
              후기 :{hoogis?.length}
            </p> */}
            <div className="flex gap-[4px] text-[14px] text-[#212121] text-semibold items-center">
              <Image width={100} height={100} src={place} alt="스푼포크" className="w-[20px] h-[20px]" />
              <span className="w-[250px] text-left block whitespace-nowrap truncate text-ellipsis">{shop.주소}</span>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
