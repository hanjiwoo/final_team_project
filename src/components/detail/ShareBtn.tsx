"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function ShareBtn() {
  const { url } = useSelector((state: any) => state.share);
  const { id } = useParams();
  const [checkClip, setCheckClip] = useState(false);
  let urlOrigin;
  const clipboardHandler = async () => {
    try {
      if (!window) return alert("url이 없어요");
      urlOrigin = window.location.origin;
      await navigator.clipboard.writeText(urlOrigin + "/detail/" + id);
      setCheckClip(true);
      setTimeout(() => {
        setCheckClip(false);
      }, 3000);
    } catch (error) {
      alert("복사 실패");
    }
  };

  const moveTokakao = () => {
    if (!url) return alert("url이 없어요");
    window.open(url, "_blank");
    // console.log(url, " 이거 없나");
  };

  return (
    <section className="flex justify-center gap-[8px] flex-col">
      <div className="flex flex-col items-center justify-center bg-[#fff] border-[1px] border-[#D6D6D6] w-[240px] h-[48px] rounded-[8px]">
        <button onClick={clipboardHandler} className=" text-[#5C5C5C] text-[14px]">
          클립보드
        </button>
        <p>{urlOrigin}</p>
        <p className="text-red-500">{checkClip && "클립보드에 복사되었습니다."}</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-[#fff] border-[1px] border-[#D6D6D6] w-[240px] h-[48px] rounded-[8px]">
        <button className="bg-[#fff] text-[#5C5C5C] text-[14px]" onClick={moveTokakao}>
          카카오맵이동
        </button>

        {/* <p>{url}</p>
				<p className="text-red-500"></p> */}
      </div>
    </section>
  );
}
