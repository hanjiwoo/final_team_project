"use client";
import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKaKao";
import { useDispatch, useSelector } from "react-redux";
import { typeOfShop } from "@/app/assets/types/types";
import { getShops } from "@/redux/modules/shopsSlice";

// type typeOfCurrent = {
//   current: string[];
// };
export default function Mapinfo({
  latitude,
  longitude,
  shops
}: {
  latitude: number;
  longitude: number;
  shops: typeOfShop[];
}) {
  // useKakaoLoader();
  // const [lat, setLat] = useState(37.450701);
  // const [lng, setLng] = useState(128.57049341667);
  // const { 시군, 업소명, 주소 } = useSelector((state: any) => state.detailShop);

  // let { current = ["", "", "", "", "", ""] } = useRef<string[]>();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (window.kakao) {
  //     const geocoder = new window.kakao.maps.services.Geocoder();
  //     geocoder.coord2Address(
  //       longitude,
  //       latitude /* 128.57049341667,
  //       37.450701, */,
  //       function (result, status) {
  //         // 정상적으로 검색이 완료됐으면
  //         // console.log(status, "이거 스테터스");
  //         if (status === window.kakao.maps.services.Status.OK) {
  //           //  ㄴ됴 result[0]
  //           //첫번째 결과의 값을 활용
  //           // 해당 주소에 대한 좌표를 받아서
  //           // const currentPos = new window.kakao.maps.LatLng(result[0].y, result[0].x);
  //           // console.log("이건 맵인포2", result);
  //           // setLng(+result[0].x);
  //           // setLat(+result[0].y);
  //           // 최종 주소 변수-> 주소 정보를 해당 필드에 넣는다.
  //           // 선택한 주소로 입력 필드 업데이트
  //           const addrArray = result[0].address.address_name.split(" ");
  //           // console.log(
  //           //   "이건 맵인포3",
  //           //   addrArray[0].substring(0, 2),
  //           //   addrArray[1]
  //           // );
  //           // current = addrArray;
  //           // console.log(addrArray, "쪼개진거");
  //           // console.log(shops[0], " 샵스 첫번째");
  //           const filteredShops = shops.filter((shop: typeOfShop) => {
  //             // console.log("shop들 확인", shop);
  //             // if (
  //             //   !shop.시군.slice(0.2) ||
  //             //   !addrArray[1].slice(0.2) ||
  //             //   !shop.시도.slice(0.2) ||
  //             //   addrArray[0].slice(0.2)
  //             // ) {
  //             //   return;
  //             // }
  //             if (shop.시군 && addrArray[1] && addrArray[0] && shop.시도) {
  //               return (
  //                 shop.시군.substring(0, 2) === addrArray[1].substring(0, 2) &&
  //                 shop.시도.substring(0, 2) === addrArray[0].substring(0, 2)
  //               );
  //             }
  //           });
  //           // console.log(filteredshops, "샵스");
  //           dispatch(getShops(filteredShops));
  //         } else {
  //           console.log("지도 로딩 실패");
  //         }
  //       }
  //     );
  //   } else {
  //     console.log("현재 작동안함");
  //   }
  // }, []);
  // useEffect(() => {

  // }, []);
  // if (current) {
  // current[0].slice(0, 2);
  // current[1];

  // dispatch;
  // }

  return (
    <>
      {/*   <div className="w-[200px] h-[200px] bg-yellow-300">
        카카오맵???{" "}
        <Map
          // ref={mapRef.current}
          className="bg-yellow-100" // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: latitude,
            lng: longitude,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={10} // 지도의 확대 레벨
        >
          <MapMarker // 마커를 생성합니다
            position={{
              // 마커가 표시될 위치입니다
              lat: latitude,
              lng: longitude,
            }}
          />
        </Map>
      </div> */}
      <div className="text-red-500">검색완료</div>
    </>
  );
}
