"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import share from "../../app/assets/images/icon/share.png";
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

  const clipBoardBtn = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);

    toast.success(`클립보드에 복사되었습니다`, {
      transition: Slide,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const moveTokakao = () => {
    if (!url) return alert("url이 없어요");
    window.open(url, "_blank");
    // console.log(url, " 이거 없나");
  };

  return (
    <section className="flex justify-center gap-[8px] flex-col max-lg:flex-row w-full">
      <div
        className="flex gap-[12px] items-center justify-center bg-[#fff] border-[1px] border-[#D6D6D6] w-[240px] h-[48px] rounded-[8px] max-lg:w-full cursor-pointer"
        onClick={clipBoardBtn}
      >
        <Image src={share} alt="share" className="w-[20px] h-[20px]" />
        <button className=" text-[#5C5C5C] text-[14px]">매장 공유하기</button>
      </div>
      <div
        className="flex flex-col items-center justify-center bg-[#fff] border-[1px] border-[#D6D6D6] w-[240px] h-[48px] rounded-[8px] max-lg:w-full cursor-pointer"
        onClick={moveTokakao}
      >
        <button className="text-[#5C5C5C] text-[14px] cursor-pointer ">카카오맵이동</button>

        {/* <p>{url}</p>
				<p className="text-red-500"></p> */}
      </div>
    </section>
  );
}
