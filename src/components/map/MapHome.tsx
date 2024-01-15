"use client";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import useKakaoLoader from "../detail/useKaKao";
import SearchForm from "../home/SearchForm";
import ColumnSlide from "./ColumnSlide";
import { RootState } from "@/redux/config/configStore";
import { getShop } from "@/redux/modules/detailShopSlice";

type typeOfRef = {
  title: string;
  latitude: string;
  longitude: string;
};

export default function MapHome() {
  useKakaoLoader();
  const shops = useSelector((state: RootState) => state.shops);
  const router = useRouter();
  const { 시군, 시도 } = shops[0];
  const [slide, setSlide] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [render, setRender] = useState(false);
  // const latRef = useRef(0);
  // const lngRef = useRef(0);
  const shopsRef = useRef<typeOfRef[]>([]);
  // const [newArray, setnewArray] = useState<typeOfRef[]>([]);
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
        // latRef.current = Number(result[0].y);
        // lngRef.current = Number(result[0].x);
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
      // setnewArray(mappedArray);
      shopsRef.current = mappedArray;
    }
  }, [shops]);
  // console.log(newArray, "나오겠지?");

  const moveToDetail = (title: string) => {
    const oneshop = shops.find((shop: typeOfShop) => {
      return shop.업소명 === title;
    });
    // console.log(oneshop);
    if (oneshop) {
      dispatch(getShop(oneshop));
      router.push(`/detail/${oneshop.연락처}`);
    } else alert("존재하지 않아요");
  };

  useEffect(() => {
    setTimeout(() => {
      setRender(!render);
    }, 100);
  }, []);

  // const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
  // e.preventDefault();
  // console.log(e.clientY, "클라와이");
  // console.log(e.deltaY, "델타와이");
  // console.log(e.movementY, "무브먼트와이");

  //   setSlide((prev) => {
  //     if (
  //       slide >= 0 ||
  //       Math.ceil((shops.length / 4) * 1000) + slide - 1500 <= 0
  //     )
  //       return prev;
  //     return prev + e.deltaY;
  //   });
  // };

  const upHandler = () => {
    if (slide >= 0) return;
    setSlide(slide + 500);
  };

  const downHandler = () => {
    if (Math.ceil((shops.length / 4) * 1000) + slide - 1500 <= 0) return;
    setSlide(slide - 500);
  };
  return (
    <>
      <div className="w-screen h-screen bg-yellow-300">
        <div className="bg-green-300 absolute top-[75px] left-[450px] z-10">
          {/* <SearchForm /> */}
        </div>
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
          level={6} // 지도의 확대 레벨
        >
          {shopsRef.current.map((shop: typeOfRef) => {
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

      <div className="absolute top-[75px] left-10 z-10 flex">
        <div
          // onWheel={(e) => wheelHandler(e)}
          className={`bg-green-300 flex flex-col h-[900px] overflow-hidden `}
        >
          <div
            style={{
              backgroundColor: "green",
              height: `${Math.ceil(shops.length / 4) * 1000}px`,
              transform: `translate(0,${slide}px)`,
              transition: "transform 0.5s",
              display: "flex",
            }}
          >
            <ColumnSlide />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <button
            onClick={upHandler}
            className=" bg-purple-300 rounded-full text-4xl hover:scale-110"
          >
            👆
          </button>
          <button
            onClick={downHandler}
            className="bg-purple-300 rounded-full text-4xl hover:scale-110"
          >
            👇
          </button>
        </div>
      </div>
    </>
  );
}