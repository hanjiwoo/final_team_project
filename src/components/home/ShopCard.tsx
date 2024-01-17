"use client";
import React from "react";
import Ddabong from "./Ddabong";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getShop } from "@/redux/modules/detailShopSlice";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import Image from "next/image";
import place from "../../app/assets/images/icon/place.png";
import spoon_fork from "../../app/assets/images/icon/spoon_fork.png";
export default function ShopCard({
	shop,
	shops,
}: {
	shop: typeOfShop;
	shops: typeOfShop[];
}) {
	const dispatch = useDispatch();
	// const shops = useSelector((state: any) => state.shops);
	const router = useRouter();

	const moveDetailPageBtn = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		phoneNum: string
	) => {
		// console.log(router);

		const detailshop = shops.find((shop: typeOfShop) => {
			return shop.연락처 === phoneNum;
		});
		if (!detailshop?.연락처) return alert("상세페이지가 없는 매장입니다.");
		dispatch(getShop(detailshop));
		router.push(`/detail/${phoneNum}`);
	};

	return (
		<>
			<section
				className="flex w-[252px] bg-[#fff] rounded-lg justify-center items-center"
				key={nanoid()}
			>
				<div className="h-full border-opacity-60 rounded-lg ">
					<div className="w-[252px] h-[252px] bg-[#F1F1F1] rounded-[12px] mb-[20px]" />
					<div className="text-base font-medium text-[#212121] mb-1 flex text-xl">
						{shop.업소명}
					</div>{" "}
					<div className="flex justify-between">
						<button
							className="hover:bg-orange-400 hover:text-white transition duration-300 ease-in whitespace-nowrap"
							onClick={(e) => moveDetailPageBtn(e, shop.연락처)}
						>
							상세페이지로
						</button>{" "}
						<Ddabong name="thumbup" shopId={shop.연락처} type="small" />
					</div>
					{/* <div className="flex justify-round gap-5"> */}
					<div className="flex gap-1 text-[14px] text-[#5C5C5C] mb-1 items-center">
						<Image src={spoon_fork} alt="위치" />
						{shop.업종}
					</div>
					<div className="flex gap-1 text-[12px] text-[#5C5C5C] mb-1 items-center">
						<Image src={place} alt="스푼포크" className="w-[20px] h-[20px]" />

						{shop.주소}
					</div>
					{/* </div> */}
				</div>
			</section>
		</>
	);
}
