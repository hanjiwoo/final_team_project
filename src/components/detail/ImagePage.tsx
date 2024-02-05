"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import phica from "../../app/assets/images/피카츄.jpg";
// import { getShop } from "@/redux/modules/detailShopSlice";
import MapTest from "./MapTest";
import { getShare } from "@/redux/modules/shareSlice";
import { Roadview } from "react-kakao-maps-sdk";
import moeumLoading from "../../app/assets/images/moeumLoading.gif";
import { nanoid } from "nanoid";

export default function ImagePage() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const shop = useSelector((state: any) => state.detailShop);
  const dispatch = useDispatch();
  const { 시군, 업소명, 주소 } = shop;
  useEffect(() => {
    if (window.kakao) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(`${시군} ${업소명}`, (data, status, _pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setLng(+data[0].x);
          setLat(+data[0].y);
          dispatch(getShare(data[0]));
        }
      });
    }
  }, [shop]);

  return (
    // <div className="flex flex-row rounded-lg justify-center items-center bg-green-300 w-[720px] h-[530px] gap-5">
    //   <div className="bg-yellow-300 w-[530px] h-[530px] overflow-hidden rounded-lg">
    //     <Image className="w-full h-full" src={phica} alt="착한가게사진"></Image>
    //   </div>

    //   <div className="bg-blue-100 flex flex-col justify-center items-center gap-5">
    //     <Image
    //       className="w-[170px] h-[170px]"
    //       src={phica}
    //       alt="착한가게사진"
    //     ></Image>
    //     <Image
    //       className="w-[170px] h-[170px]"
    //       src={phica}
    //       alt="착한가게사진"
    //     ></Image>
    //     <Image
    //       className="w-[170px] h-[170px]"
    //       src={phica}
    //       alt="착한가게사진"
    //     ></Image>
    //   </div>
    // </div>

    <div className="w-full flex justify-center items-center">
      <div className="w-[720px] h-[530px] justify-center items-center gap-4 rounded-lg overflow-hidden max-sm:w-full max-sm:h-[360px]">
        {/* <div className="w-[530px] h-[530px] relative bg-zinc-100 rounded-xl" /> */}
        <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
          <Roadview
            panoId={+nanoid()}
            position={{
              // 지도의 중심좌표
              lat,
              lng,
              radius: 50
            }}
            style={{
              // 지도의 크기
              width: "100%",
              height: "100%"
            }}
          />
        </div>
        {/* <div className="w-[170px] self-stretch flex-col justify-start items-center gap-4 inline-flex">
        <div className="w-[170px] h-[170px] relative bg-zinc-100 rounded-xl" />
        <div className="w-[170px] h-[170px] relative bg-zinc-100 rounded-xl" />
        <div className="w-[170px] h-[170px] relative bg-zinc-100 rounded-xl" />
      </div> */}
      </div>
    </div>
  );
}
