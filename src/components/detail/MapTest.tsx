"use client";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKaKao";
import { useSelector } from "react-redux";

export default function MapTest() {
  useKakaoLoader();
  const [lat, setLat] = useState(37.450701);
  const [lng, setLng] = useState(128.57049341667);
  const { 시군, 업소명, 주소 } = useSelector((state: any) => state.detailShop);

  useEffect(() => {
    if (window.kakao) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(`${시군} ${업소명}`, (data, status, _pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          // console.log(data, " 지도 데이터");
          // console.log(status, " 스테이터스");
          // console.log(_pagination, "페이지 어쩌구");
          setLng(+data[0].x);
          setLat(+data[0].y);
        }
      });
    }
  }, []);

  return (
    <div className="w-[200px] h-[200px] bg-yellow-300">
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
        level={10} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat,
            lng,
          }}
        />
      </Map>
    </div>
  );
}
