"use client";
import React, { useEffect, useState } from "react";
import Mapinfo from "../detail/Mapinfo";
import { useRouter } from "next/navigation";
import useKakaoLoader from "../detail/useKaKao";
import { typeOfShop } from "@/app/assets/types/types";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "@/redux/modules/shopsSlice";
import { RootState } from "@/redux/config/configStore";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NowLocationBtn() {
  const shops = useSelector((state: RootState) => state.allShops);
  const [latitude, setLatitude] = useState<number>(37.49689);
  const [longitude, setLongitude] = useState<number>(127.063);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  useKakaoLoader();

  const findNowLoacation = () => {
    if (!window.kakao && !shops)
      return toast.error("잠시만 기다려주세요", {
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

    if (window.kakao) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(longitude, latitude, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const addrArray = result[0].address.address_name.split(" ");

          const filteredShops = shops.filter((shop: typeOfShop) => {
            if (shop.시군 && addrArray[1] && addrArray[0] && shop.시도) {
              return (
                shop.시군.substring(0, 2) === addrArray[1].substring(0, 2) &&
                shop.시도.substring(0, 2) === addrArray[0].substring(0, 2)
              );
            }
          });
          // console.log(filteredshops, "샵스");
          dispatch(getShops(filteredShops));
        } else {
          console.log("지도 로딩 실패");
        }
      });
    }
  };
  useEffect(() => {
    findNowLoacation();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, [shops]);
  return (
    <>
      <button
        className="bg-[#FF8145] hover:bg-[#E5743E] w-[180px] max-sm:w-[130px] text-white py-[14px] px-[10px] rounded-[8px]"
        onClick={findNowLoacation}
      >
        <span className="text-[15px] max-sm:text-[12px]">내 주변 모음 검색하기</span>
      </button>
      {/*  <div>
        <h2>Your Location:</h2>
        {latitude !== null && longitude !== null ? (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </>
  );
}
