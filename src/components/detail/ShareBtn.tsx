"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function ShareBtn() {
  const { url } = useSelector((state: any) => state.share);

  const [checkClip, setCheckClip] = useState(false);
  const clipboardHandler = async () => {
    try {
      if (url === "") return alert("url이 없어요");
      await navigator.clipboard.writeText(url);
      setCheckClip(true);
      setTimeout(() => {
        setCheckClip(false);
      }, 3000);
    } catch (error) {
      alert("복사 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-blue-500 w-56 h-32">
      <button onClick={clipboardHandler} className="bg-red-600 text-white">
        공유하기
      </button>
      <p>{url}</p>
      <p className="text-red-500">
        {checkClip && "클립보드에 복사되었습니다."}
      </p>
    </div>
  );
}
