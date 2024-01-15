"use client";
import React from "react";
import Image from "next/image";
import userIcon from "../assets/images/icon/userIcon.png";
export default function listpage() {
  return (
    <>
      <div>
        <p>추천해요 목록 입니다.</p>
      </div>

      <div>
        <h1>제목입니다</h1>
        <p>내용입니다.</p>
        {/* img src={null ?? defaultUser} alt="프로필이미지" */}
        <Image src={userIcon} alt="profile" className="w-[28px] h-[28px]" />
        <p>닉네임입니다.</p>
        <p>날짜입니다.</p>
        <p>사진입니다(우측으로갈것)</p>
      </div>

      <button className="border-2 border-black">작성하기</button>
    </>
  );
}
