"use client";
import React, { useEffect, useState } from "react";
import Mapinfo from "../detail/Mapinfo";
import { useRouter } from "next/navigation";
import useKakaoLoader from "../detail/useKaKao";
import { typeOfShop } from "@/app/assets/types/types";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "@/redux/modules/shopsSlice";
import { RootState } from "@/redux/config/configStore";

export default function NowLocationBtn() {
	const shops = useSelector((state: RootState) => state.allShops);
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const [toggle, setToggle] = useState(false);
	const dispatch = useDispatch();
	useKakaoLoader();

	useEffect(() => {
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
	}, []);

	const findNowLoacation = () => {
		if (!window.kakao && !shops) return alert("잠시만용");

		if (window.kakao) {
			const geocoder = new window.kakao.maps.services.Geocoder();
			geocoder.coord2Address(
				longitude,
				latitude /* 128.57049341667,
        37.450701, */,
				function (result, status) {
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
				}
			);
		}
	};

	return (
		<>
			<button
				className="bg-[#FF8145] text-white font-[500] py-[14px] px-[27px] rounded-[8px]"
				onClick={findNowLoacation}
			>
				내 주변 모-음 검색하기
			</button>{" "}
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
