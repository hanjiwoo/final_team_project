"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import postIcon from "../../assets/images/icon/pencilIcon.png";

export default function PostDataOff() {
	return (
		<div className="flex justify-center items-center w-screen mt-[60px] mb-[60px]">
			<div className="w-[880px] h-[568px]">
				<h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px]">
					게시물 모음
				</h1>

				<form className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
					<Image src={postIcon} alt="mainIcon" className="w-[48px] h-[48px]" />
					<span className="text-center text-neutral-400 text-base font-medium leading-normal">
						작성한 게시글이 따로 없습니다
						<br />
						게시글을 작성해주세요 :)
					</span>
				</form>
			</div>
		</div>
	);
}
