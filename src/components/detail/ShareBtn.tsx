"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function ShareBtn() {
  const { url } = useSelector((state: any) => state.share);
  const router = useRouter();
  const [checkClip, setCheckClip] = useState(false);
  let urlOrigin;
  const clipboardHandler = async () => {
    try {
      if (!window) return alert("url이 없어요");
      urlOrigin = window.location.origin;
      await navigator.clipboard.writeText(urlOrigin);
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
    console.log(url, " 이거 없나");
  };

  return (
    <section className="flex justify-center gap-10">
      <div className="flex flex-col items-center justify-center bg-blue-500 w-56 h-32">
        <button onClick={clipboardHandler} className="bg-red-600 text-white">
          클립보드
        </button>
        <p>{urlOrigin}</p>
        <p className="text-red-500">
          {checkClip && "클립보드에 복사되었습니다."}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-500 w-56 h-32">
        <button className="bg-red-600 text-white" onClick={moveTokakao}>
          카카오맵이동
        </button>

        <p>{url}</p>
        <p className="text-red-500"></p>
      </div>
    </section>
  );
}
