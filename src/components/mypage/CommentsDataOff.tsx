"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pencilIcon from "../../app/assets/images/icon/pencilIcon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useQuery } from "@tanstack/react-query";
import { getThumbs } from "../home/Fns";
import { useRouter } from "next/navigation";
import right from "../../app/assets/images/icon/myRight.png";

export default function CommentsDataOff() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-screen mt-[60px] mb-[60px]">
      <div className="w-[880px] h-[568px]">
        <div className="flex flex-row gap-[5px] mb-[40px] max-sm:mb-[32px]">
          <span
            className="text-[14px] leading-[20px] text-[#C2C2C2] cursor-pointer"
            onClick={() => {
              router.push("/mypage");
            }}
          >
            마이 모음
          </span>
          <Image src={right} alt="right" className="w-[18px] h-[18px]" />
          <span className="text-[14px] leading-[20px] text-[#7A7A7A]">댓글 모음</span>
        </div>
        <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px]">댓글 모음</h1>
        <section className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
          <Image src={pencilIcon} alt="mainIcon" className="w-[48px] h-[48px]" />
          <span className="text-center text-neutral-400 text-base font-medium leading-normal">
            작성한 댓글이 따로 없습니다
            <br />
            댓글을 작성해주세요 :)
          </span>
        </section>
      </div>
    </div>
  );
}
