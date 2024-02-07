import React from "react";
import NowLocationBtn from "./NowLocationBtn";
import Image from "next/image";
import mainBannerImage from "../../app/assets/images/mainBannerImage.jpg";

export default function MainBanner() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden max-sm:h-[300px]">
      <Image width={3000} height={800} src={mainBannerImage} alt="mainImage" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white drop-shadow-[4px_0_8px_rgb(0,0,0,0.2)] ">
        <div className="text-shadow text-[28px] font-[700] mb-[12px] max-lg:text-[20px] max-sm:text-[15px] max-sm:leading-[20px] max-sm:hidden">
          따뜻한 마음들을 모아 당신에게 드려요 :)
        </div>
        <div className="text-shadow text-[28px] font-[700] mb-[12px] max-lg:text-[20px] max-sm:text-[15px] max-sm:leading-[20px] sm:hidden">
          따뜻한 마음들을 모아 <br /> 당신에게 드려요 :)
        </div>
        <div className="text-shadow text-[40px] font-[700] mb-[32px] max-lg:text-[30px] max-sm:text-[20px] max-sm:leading-[20px]">
          모두의 음식점, 모음
        </div>
        <NowLocationBtn />
      </div>
    </div>
  );
}
