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
import PhotoOfShop from "./PhotoOfShop";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    if (!shop?.연락처)
      return toast.warning("상세페이지가 없는 식당입니다.", {
        transition: Slide,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    dispatch(getShop(shop));
    router.push(`/detail/${shop.연락처}`);
  };
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
  //           addrBuilding: result[0].road_address ? result[0].road_address.building_name : ""
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
    <button onClick={(e) => moveDetailPageBtn(e, shop.연락처)}>
      <section className="flex w-[252px] bg-[#fff] rounded-lg justify-center items-center mx-[10px]" key={nanoid()}>
        <div className="h-full border-opacity-60 rounded-lg w-full">
          <PhotoOfShop shop={shop} />

          <div className="font-medium text-[#212121] mb-1 flex text-xl">{shop.업소명}</div>
          <div className="flex justify-between">
            {/* <Ddabong name="thumbup" shopId={shop.연락처} type="small" /> */}
          </div>
          {/* <div className="flex justify-round gap-5"> */}
          <div className="flex gap-1 text-[12px] text-[#5C5C5C] mb-1 items-center">
            <Image width={100} height={100} src={spoon_fork} alt="스푼포크" className="w-[18px] h-[18px]" />
            {shop.업종}
          </div>
          <div className="flex gap-1 text-[12px] text-[#5C5C5C] mb-1 items-center ">
            <Image width={100} height={100} src={place} alt="위치" className="w-[18px] h-[18px]" />
            <span className="w-full text-left block whitespace-nowrap truncate text-ellipsis">{shop.주소}</span>
          </div>
          {/* </div> */}
        </div>
      </section>
    </button>
  );
}
