"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pencilIcon from "../../app/assets/images/icon/pencilIcon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useQuery } from "@tanstack/react-query";
import { getThumbs } from "../home/Fns";

export default function CommentsDataOff() {
  return (
    <div className="flex justify-center items-center w-screen mt-[60px] mb-[60px]">
      <div className="w-[880px] h-[568px]">
        <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px]">
          댓글 모음
        </h1>
        <section className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
          <Image
            src={pencilIcon}
            alt="mainIcon"
            className="w-[48px] h-[48px]"
          />
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
