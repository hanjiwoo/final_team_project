"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeOfShop } from "@/app/assets/types/types";
import { getShop } from "@/redux/modules/detailShopSlice";
import Ddabong from "./Ddabong";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShopCard from "./ShopCard";
import { nanoid } from "nanoid";
import { RootState } from "@/redux/config/configStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import place from "../../app/assets/images/icon/place.png";

export default function ShopList() {
	const shops = useSelector((state: RootState) => state.shops);
	const dispatch = useDispatch();
	// console.log(shops, " 일단 레절트");
	const [slide, setSlide] = useState<number>(0);
	const router = useRouter();

	// console.log(Math.ceil(shops.length / 4), "길이 알아보자");

	const rigthMove = () => {
		if (Math.ceil((shops.length / 4) * 1000) + slide - 1500 <= 0) return;
		// console.log(Math.ceil(shops.length / 4) * 1000, "흐음", slide);
		setSlide(slide - 500);
	};
	const leftMove = () => {
		if (slide >= 0) return;
		setSlide(slide + 500);
	};

	const moveToFullMap = () => {
		router.push("/map");
	};
	return (
		<>
			<div className="container  py-[40px] w-full relative">
				<div className="text-center mb-12">
					<h1 className="text-[28px] text-[#212121] font-semibold leading-[36px] mb-[12px]">
						내 주변의 모-음은 어디일까요?
					</h1>
					<div className="mb-[60px]">
						{shops[0]?.시도 === "" ? (
							<div> 검색이 필요해요</div>
						) : (
							<div className="flex justify-center gap-2 font-[18px] font-[500] leading-[26px]">
								현재{" "}
								<Image
									src={place}
									alt="위치마크"
									className="w-[24px] h-[24px]"
								/>
								<p className="font-bold text-[18px] leading-[26px]">
									{shops[0]?.시도} {shops[0]?.시군}
								</p>
								기준이에요
							</div>
						)}
					</div>
				</div>
				<div className="flex justify-center items-center">
					<div
						style={{
							transform: `translate(${slide}px)`,
							transition: "transform 0.5s",
							display: "flex",
						}}
						className="overflow-hidden flex gap-[24px] justify-center items-center"
					>
						{shops.map((shop: typeOfShop) => {
							return (
								<React.Fragment key={nanoid()}>
									<ShopCard shop={shop} shops={shops} />
								</React.Fragment>
							);
						})}
					</div>
				</div>
				<section className="flex bg-blue-300 justify-around">
					<button
						className="bg-purple-300 rounded-full text-4xl hover:scale-110 absolute top-[200px] left-[-60px]"
						onClick={leftMove}
					>
						👈
					</button>
					<button
						className="bg-purple-300 rounded-full text-4xl hover:scale-110 absolute top-[200px] right-[-60px]"
						onClick={rigthMove}
					>
						👉
					</button>
					{shops[0] && (
						<button
							onClick={moveToFullMap}
							className="bg-orange-500 w-[50px] h-[50px] rounded-full absolute top-[45px] right-[10px] hover:scale-105"
						>
							맵보러가기
						</button>
					)}
				</section>
			</div>
		</>
	);
}
