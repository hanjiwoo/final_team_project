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
import ShopCard from "../home/ShopCard";
import Shopinfo from "../detail/Shopinfo";
import ShopCard2 from "./ShopCard2";
import Image from "next/image";
import upButton from "../../app/assets/images/icon/up.png";
import downButton from "../../app/assets/images/icon/down.png";

type typeOfRef = {
  title: string;
  latitude: string;
  longitude: string;
};

export default function MapHome() {
  useKakaoLoader();
  const shops = useSelector((state: RootState) => state.shops);
  const router = useRouter();
  const mapCenterRef = useRef({ 시군: "", 시도: "" });
  if (shops[0]) {
    const { 시군, 시도 } = shops[0];
    mapCenterRef.current = { 시군, 시도 };
  }
  const [slide, setSlide] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [render, setRender] = useState(false);
  const [infoToggle, setInfoToggle] = useState(false);
  // const latRef = useRef(0);
  // const lngRef = useRef(0);
  const shopsRef = useRef<typeOfRef[]>([]);
  const shopInfoRef = useRef<typeOfShop>(shops[0]);
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
    if (!shops[0]) {
      router.push("/");
    }
    if (window.kakao) {
      let geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(`${mapCenterRef.current.시도} ${mapCenterRef.current.시군}`, function (result, status) {
        // console.log(result, "이거 레절트");
        setLng(+result[0].x);
        setLat(+result[0].y);
        // latRef.current = Number(result[0].y);
        // lngRef.current = Number(result[0].x);
      });

      let mappedArray: {
        title: string;
        latitude: string;
        longitude: string;
      }[] = [];
      for (let i = 0; i < shops.length; i++) {
        let OBOB = {
          title: "",
          latitude: "",
          longitude: ""
        };
        geocoder.addressSearch(shops[i].주소, function (result, status) {
          OBOB.title = shops[i].업소명;
          if (result[0]) {
            OBOB.latitude = result[0].y;
            OBOB.longitude = result[0].x;
          }
        });
        mappedArray.push(OBOB);
      }

      shopsRef.current = mappedArray;
    }
  }, [shops]);
  // console.log(newArray, "나오겠지?");

  // const moveToDetail = (title: string) => {
  //   const oneshop = shops.find((shop: typeOfShop) => {
  //     return shop.업소명 === title;
  //   });
  //   // console.log(oneshop);
  //   if (oneshop) {
  //     dispatch(getShop(oneshop));
  //     router.push(`/detail/${oneshop.연락처}`);
  //   } else alert("존재하지 않아요");
  // };

  useEffect(() => {
    setTimeout(() => {
      setRender((prev) => {
        return !prev;
      });
    }, 1000);
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

  const openShopInfo = (title: string) => {
    const foundShop = shops.find((shop: typeOfShop) => {
      return shop.업소명 === title;
    });
    if (foundShop) {
      shopInfoRef.current = foundShop;
    }
    setInfoToggle((prevInfoToggle) => !prevInfoToggle);
  };
  return (
    <>
      <div className="w-screen h-screen bg-yellow-300">
        <div className="bg-green-300 absolute top-[75px] left-[450px] z-10">{/* <SearchForm /> */}</div>
        <Map
          onClick={() => setInfoToggle(!infoToggle)}
          // ref={mapRef.current}
          className="bg-yellow-100" // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat,
            lng
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%"
          }}
          level={6} // 지도의 확대 레벨
        >
          {shopsRef.current.map((shop: typeOfRef) => {
            return (
              <MapMarker
                key={nanoid()}
                position={{ lat: +shop.latitude, lng: +shop.longitude }}
                title={shop.title}
                onClick={() => openShopInfo(shop.title)}
              >
                {/* <div className="flex justify-center items-center w-[140px] p-[5px] m-[5px] font-black">
                  {shop.title}
                </div> */}
                {infoToggle && shop.title === shopInfoRef.current.업소명 && (
                  <>
                    <ShopCard2 type="map" shops={shops} shop={shopInfoRef.current} />{" "}
                  </>
                )}
                {/* <div>클릭하시면정보나옴</div> */}
              </MapMarker>
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

      <div className="absolute top-[64px] z-10 h-full flex items-center">
        <div
          // onWheel={(e) => wheelHandler(e)}
          // className={`flex flex-col h-[900px]`}
          className="flex flex-col  my-[30px]  h-full"
        >
          {/* <div
						style={{
							height: `${Math.ceil(shops.length / 4) * 1000}px`,
							transform: `translate(0,${slide}px)`,
							transition: "transform 0.5s",
							display: "flex",
						}}
					>
					</div> */}
          <ColumnSlide />
        </div>
        {/* <div className="flex flex-col justify-center gap-5 h-screen ml-[20px] ">
					<button
						onClick={upHandler}
						className=" bg-purple-300 rounded-full text-4xl hover:scale-110"
					>
						👆
					</button>
					<Image
						onClick={upHandler}
						src={upButton}
						alt="upButton"
						className="w-[30px] h-[30px] cursor-pointer"
					/>
					<button
						onClick={downHandler}
						className="bg-purple-300 rounded-full text-4xl hover:scale-110"
					>
						👇
					</button>
					<Image
						onClick={downHandler}
						src={downButton}
						alt="downButton"
						className="w-[30px] h-[30px] cursor-pointer"
					/>
				</div> */}
      </div>
    </>
  );
}
