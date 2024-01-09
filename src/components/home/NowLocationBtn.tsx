"use client";
import React, { useEffect, useState } from "react";
import Mapinfo from "../detail/Mapinfo";
import { useRouter } from "next/navigation";
import useKakaoLoader from "../detail/useKaKao";
import { typeOfShop } from "@/app/assets/types/types";

export default function NowLocationBtn({ shops }: { shops: typeOfShop[] }) {
  const [latitude, setLatitude] = useState<number>(37.450701);
  const [longitude, setLongitude] = useState<number>(128.57049341667);
  const [toggle, setToggle] = useState(false);
  useKakaoLoader();
  const router = useRouter();
  useEffect(() => {
    // 브라우저가 Geolocation API를 지원하는지 확인
    if ("geolocation" in navigator) {
      // 위치 정보를 가져오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
      // const watchID = navigator.geolocation.watchPosition((position) => {
      //   console.log(
      //     position.coords.latitude,
      //     position.coords.longitude,
      //     "위치위치"
      //   );
      // });
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  const findNowLoacation = () => {
    if (!window.kakao && !shops) return alert("잠시만용");
    setToggle((prev: boolean) => {
      return !prev;
    });
  };

  return (
    <>
      <div>
        <h2>Your Location:</h2>
        {latitude !== null && longitude !== null ? (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="bg-black text-white" onClick={findNowLoacation}>
        현재위치로 찾기
      </button>
      {toggle && (
        <Mapinfo latitude={latitude} longitude={longitude} shops={shops} />
      )}
    </>
  );
}
