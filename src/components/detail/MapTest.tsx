"use client";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKaKao";
import { useDispatch, useSelector } from "react-redux";
import { getShare } from "@/redux/modules/shareSlice";
import { getShop } from "@/redux/modules/detailShopSlice";
import ShareBtn from "@/components/detail/ShareBtn";
import { RootState } from "@/redux/config/configStore";

export default function MapTest() {
  useKakaoLoader();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const shop = useSelector((state: RootState) => state.detailShop);
  const dispatch = useDispatch();
  const { 시군, 업소명, 주소 } = shop;
  useEffect(() => {
    if (window.kakao) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(`${시군} ${업소명}`, (data, status, _pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // LatLngBounds 객체에 좌표를 추가합니다
          // console.log(data, " 지도 데이터");
          // console.log(status, " 스테이터스");
          // console.log(_pagination, "페이지 어쩌구");
          setLng(+data[0].x);
          setLat(+data[0].y);
          dispatch(getShare(data[0]));
          // address_name: "경기 의정부시 의정부동 592-2";
          // category_group_code: "FD6";
          // category_group_name: "음식점";
          // category_name: "음식점 > 한식 > 해장국";
          // distance: "";
          // id: "821269934";
          // phone: "031-877-8882";
          // place_name: "차가네해장국 의정부점";
          // place_url: "http://place.map.kakao.com/821269934";
          // road_address_name: "경기 의정부시 경의로 66";
        }
      });
    }
  }, [shop]);

  return (
    <div className="z-[100] relative left-0 mt-[60px] max-lg:hidden">
      {lat === 0 ? (
        <div className="w-[240px] h-[240px] fixed flex justify-center items-center border-[1px] border-[#D6D6D6] rounded-lg text-[#7A7A7A] bg-[#fff]">
          지도가 로드되지 못했습니다.
        </div>
      ) : (
        <div className="fixed">
          <div className="flex  justify-center items-center rounded-lg">
            <div className="w-[240px] h-[240px] overflow-hidden rounded-lg mb-[16px] border-[1px] border-[#D6D6D6]">
              <Map
                // ref={mapRef.current}

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
                level={7} // 지도의 확대 레벨
              >
                <MapMarker // 마커를 생성합니다
                  position={{
                    // 마커가 표시될 위치입니다
                    lat,
                    lng
                  }}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
                    size: {
                      width: 64,
                      height: 69
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 27,
                        y: 69
                      } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    }
                  }}
                />
              </Map>
            </div>
          </div>
          <ShareBtn />
        </div>
      )}
    </div>
  );
}
