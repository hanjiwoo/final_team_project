"use client";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import useKakaoLoader from "../detail/useKaKao";

type typeOfRef = {
  title: string;
  latitude: string;
  longitude: string;
};

export default function MapHome() {
  useKakaoLoader();
  const shops = useSelector((state: any) => state.shop);
  const router = useRouter();
  const { 시군, 시도 } = shops[0];
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  // const shopsRef = useRef<typeOfRef>({
  //   title: "",
  //   latitude: "",
  //   longitude: "",
  // });
  const [newArray, setnewArray] = useState<typeOfRef[]>([]);
  const dispatch = useDispatch();
  class NewShops {
    title: string;
    latitude: string;
    longitude: string;
    constructor(title: string, latitude: string, longitude: string) {
      this.title = title;
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }

  useEffect(() => {
    if (window.kakao) {
      let geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(`${시도} ${시군}`, function (result, status) {
        // console.log(result, "이거 레절트");
        setLng(+result[0].x);
        setLat(+result[0].y);
      });
      const mappedArray = shops.map((shop: typeOfShop) => {
        let OBOB = {
          title: "",
          latitude: "",
          longitude: "",
        };

        geocoder.addressSearch(shop.주소, function (result, status) {
          OBOB.title = shop.업소명;
          OBOB.latitude = result[0].y;
          OBOB.longitude = result[0].x;
        });
        // console.log(OBOB, "여기서 찍히니?");
        return OBOB;
      });
      // console.log(mappedArray, " 젭알나와줘 ㅜㅜ");
      setnewArray(mappedArray);
    }
  }, []);
  // console.log(newArray, "나오겠지?");

  const moveToDetail = (title: string) => {
    const oneshop = shops.find((shop: typeOfShop) => {
      return shop.업소명 === title;
    });
    // console.log(oneshop);
    router.push(`/detail/${oneshop.연락처}`);
  };
  return (
    <>
      <div className="w-[600px] h-[600px] bg-yellow-300">
        맵을받아보자규
        <Map
          // ref={mapRef.current}
          className="bg-yellow-100" // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat,
            lng,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={7} // 지도의 확대 레벨
        >
          {newArray.map((shop: typeOfRef) => {
            return (
              <MapMarker
                key={nanoid()}
                position={{ lat: +shop.latitude, lng: +shop.longitude }}
                title={shop.title}
                onClick={() => moveToDetail(shop.title)}
              />
            );
          })}
          {/* <MapMarker
            position={{
              lat,
              lng,
            }}
            title="현재위치"
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
              size: {
                width: 64,
                height: 69,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          /> */}
        </Map>
      </div>
    </>
  );
}
