"use client";
import { typeOfShop } from "@/app/assets/types/types";
import { RootState } from "@/redux/config/configStore";
import React from "react";
import { useSelector } from "react-redux";
import ShopCard from "../home/ShopCard";
import { nanoid } from "nanoid";
import ShopCard2 from "./ShopCard2";

export default function ColumnSlide() {
	const shops = useSelector((state: RootState) => state.shops);

	return (
		<>
			<div className="flex flex-col gap-[10px] my-[20px] h-full items-center overflow-scroll px-[20px]">
				{shops.map((shop: typeOfShop) => {
					return (
						<React.Fragment key={nanoid()}>
							<ShopCard2 shops={shops} shop={shop} />
						</React.Fragment>
					);
				})}
			</div>
		</>
	);
}
