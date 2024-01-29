import React from "react";
import NowLocationBtn from "./NowLocationBtn";
import Image from "next/image";
import mainBannerImage from "../../app/assets/images/mainBannerImage.jpg";

export default function MainBanner() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden">
      <Image src={mainBannerImage} alt="mainImage" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div className="text-[28px] font-[700] mb-[12px] ">따뜻한 마음들을 모아 당신에게 드려요 :)</div>
        <div className="text-[40px] font-[700] mb-[32px] ">모두의 음식점, 모음</div>
        <NowLocationBtn />
      </div>
    </div>
  );
}
