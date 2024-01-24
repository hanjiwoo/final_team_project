"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import storeMainIcon from "../../app/assets/images/icon/SFIcon.png";

export default function StoreDataOff() {
	return (
		<div className="flex justify-center items-center w-screen my-[60px] px-[20px]">
			<div className="w-[880px] h-[568px]">
				<h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px]">
					매장 모음
				</h1>

				<form className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
					<Image
						src={storeMainIcon}
						alt="mainIcon"
						className="w-[48px] h-[48px]"
					/>
					<span className="text-center text-neutral-400 text-base font-medium leading-normal">
						저장된 모음이 따로 없습니다
						<br />
						관심있는 매장을 저장해주세요 :)
					</span>
				</form>
			</div>
		</div>
	);
}
