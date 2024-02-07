import React from "react";
import "./layout.css";
import Image from "next/image";
import footerMoeumLogo from "../../app/assets/images/footerMoeumLogo.png";

const textClass = "text-[14px] text-[#999] leading-[20px] max-sm:text-[12px] max-sm:leading-[18px]";

export default function Footer() {
  return (
    <div className="bg-[#fff] w-full flex justify-center items-center border-t-[1px] border-[##E1E1E1] py-[40px] px-[20px]">
      <div className="md:flex md:justify-between w-[1080px] items-center">
        <section className="flex flex-col gap-[24px] max-sm:gap-[8px]">
          <h2 className="text-[#7a7a7a] text-[16px] leading-[24px] font-semibold">찾아오시는 길</h2>
          <section className="flex gap-[12px] flex-col">
            <div className="flex gap-[8px]">
              <span className={textClass}>팀</span>
              <span className={textClass}>|</span>
              <span className={textClass}>2만큼 성장했조</span>
            </div>
            <div className="flex gap-[8px]">
              <span className={textClass}>팀원</span>
              <span className={textClass}>|</span>
              <span className={textClass}>
                리더 여인준 부리더 이아름 팀원 이상욱 팀원 한지우 <br />
                디자이너 이가현
              </span>
            </div>
          </section>
          <span className={textClass}>Copyright ⓒ 2024 2만큼성장했조. All Rights Reserved.</span>
        </section>
        <section className="text-[32px] text-[#999] leading-normal font-bold flex md:justify-center items-center">
          {/* <span className="mt-[24px]">모음</span> */}
          <Image
            width={200}
            height={200}
            src={footerMoeumLogo}
            alt="footerLogo"
            className="mt-[24px] w-[90px] h-[30px]"
          />
        </section>
      </div>
    </div>
  );
}
