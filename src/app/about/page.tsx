"use client";
import React from "react";
import Image from "next/image";
import inforServiceImage from "../assets/images/inforServiceImage.jpg";
import whatMoeum from "../assets/images/infor/1InforImage.png";
import moeumCriteria from "../assets/images/infor/2InforImage.png";
import moeumDisplay1 from "../assets/images/infor/3InforImage.png";
import moeumDisplayInfor1 from "../assets/images/infor/4InforImage.png";
import moeumDisplay2 from "../assets/images/infor/5InforImage.png";
import moeumDisplayInfor2 from "../assets/images/infor/6InforImage.png";
import moeumDisplay3 from "../assets/images/infor/7InforImage.png";
import moeumDisplayInfor3 from "../assets/images/infor/8InforImage.png";
import moeumDisplay4 from "../assets/images/infor/9InforImage.png";
import moeumDisplayInfor4 from "../assets/images/infor/10InforImage.png";
import moeumDevice from "../assets/images/infor/11InforImage.png";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="w-full sm:py-[60px] flex justify-center items-center flex-col bg-[#fff] text-center">
      <section className="flex justify-center items-center w-full sm:py-[120px] max-sm:py-[60px] max-sm:px-[20px] max-sm:mt-[60px]">
        <div className="flex justify-center items-center flex-col gap-[80px]">
          <div className="flex gap-[24px] flex-col justify-center items-center max-sm:gap-[12px]">
            <h1 className="text-[32px] font-[700] leading-[42px] text-[#212121] max-sm:text-[20px]">
              모두의 음식점과 마음이 모인 곳 <span className="text-[#FF8145]">&quot;모음&quot;</span>이에요
            </h1>
            <span className="text-[18px] font-semibold leading-[26px] text-[#3F3F3F] max-sm:text-[14px] max-sm:leading-[20px] max-sm:br:display-none">
              “착한 가격, 청결한 가게운영, 기분 좋은 서비스 제공” 으로 소비자에게 만족을 드리기 위해 <br />
              정부와 지방자치단체가 선정한 우수업소인 착한 가격업소들을 모아 만들어진 서비스 입니다
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Image width={700} height={700} src={whatMoeum} alt="whatMoeum" className="w-[754px]" />
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center bg-[#FAFAFA] w-full sm:py-[120px] max-sm:px-[20px] max-sm:py-[60px]">
        <div className="flex justify-center items-center flex-col gap-[80px]">
          <div className="flex gap-[24px] flex-col justify-center items-center max-sm:gap-[12px]">
            <h1 className="text-[32px] font-[700] leading-[42px] text-[#212121] max-sm:text-[20px]">
              <span className="text-[#FF8145]">&quot;모음&quot;</span>의 선정기준은 무엇인가요?
            </h1>
            <span className="text-[18px] font-semibold leading-[26px] text-[#3F3F3F] max-sm:text-[14px] max-sm:leading-[20px] max-sm:br:display-none">
              행정안전부의 선정기준을 바탕으로 저렴한 가격으로 깨끗한 시설에서 믿을 수 있는 재료를 사용하고, <br />
              친절한 서비스를 제공하는 업소를 기준으로 선정되었습니다
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Image width={700} height={700} src={moeumCriteria} alt="moeumCriteria" className="w-[754px]" />
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center w-full py-[120px] max-sm:px-[20px] max-sm:py-[60px]">
        <div className="flex justify-center items-center flex-col gap-[80px]">
          <div className="flex gap-[24px] flex-col justify-center items-center max-sm:gap-[12px]">
            <h1 className="text-[32px] font-[700] leading-[42px] text-[#212121] max-sm:text-[20px]">
              우리의
              <span className="text-[#FF8145]"> &quot;모음&quot;</span>은 이렇게 즐길 수 있어요
            </h1>
            <span className="text-[18px] font-semibold leading-[26px] text-[#3F3F3F] max-sm:text-[14px] max-sm:leading-[20px]">
              착한 가격의 매장을 한눈에 살펴보고,
              <br /> 간편한 리뷰 남기기와 함께 소통할 수 있는 커뮤니티까지!
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-[120px] max-sm:gap-[80px]">
            <div className="flex justify-center items-center flex-row-reverse gap-[80px] max-sm:gap-[24px] max-sm:flex-col">
              <Image width={400} height={400} src={moeumDisplayInfor1} alt="moeumDisplayInfor1" className="w-[360px]" />
              <Image width={700} height={700} src={moeumDisplay1} alt="moeumDisplay1" className="w-[600px]" />
            </div>
            <div className="flex justify-center items-center gap-[80px] max-sm:gap-[24px] max-sm:flex-col">
              <Image width={400} height={400} src={moeumDisplay2} alt="moeumDisplay2" className="w-[360px]" />
              <Image width={700} height={700} src={moeumDisplayInfor2} alt="moeumDisplayInfor2" className="w-[600px]" />
            </div>
            <div className="flex justify-center items-center flex-row-reverse gap-[80px] max-sm:gap-[24px] max-sm:flex-col">
              <Image width={400} height={400} src={moeumDisplayInfor3} alt="moeumDisplayInfor3" className="w-[360px]" />
              <Image width={700} height={700} src={moeumDisplay3} alt="moeumDisplay3" className="w-[600px]" />
            </div>
            <div className="flex justify-center items-center gap-[80px] max-sm:gap-[24px] max-sm:flex-col">
              <Image width={400} height={400} src={moeumDisplay4} alt="moeumDisplay4" className="w-[360px]" />
              <Image width={700} height={700} src={moeumDisplayInfor4} alt="moeumDisplayInfor4" className="w-[600px]" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center bg-[#fff] w-full py-[120px] max-sm:px-[20px] max-sm:py-[60px]">
        <div className="flex justify-center items-center flex-col gap-[60px]">
          <div className="flex gap-[24px] flex-col justify-center items-center max-sm:gap-[12px]">
            <h1 className="text-[32px] font-[700] leading-[42px] text-[#212121] max-sm:text-[20px] max-sm:leading-[28px] ">
              이제는 PC, 모바일에서도 <br />
              <span className="text-[#FF8145]">&quot;모음&quot;</span>과 함께하세요!
            </h1>
            <span className="text-[18px] font-semibold leading-[26px] text-[#3F3F3F] max-sm:text-[14px] max-sm:leading-[20px]">
              모음은 다양한 서비스 환경을 통해 불편함 없이 편리하게 이용할 수 있습니다 <br />
              지금 바로 모-음을 시작해볼까요?
            </span>
          </div>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="bg-[#FF8145] py-[8px] px-[16px] rounded-[8px] text-[#fff] text-[14px] w-[160px] h-[48px] leading-[20px] max-sm:w-[140px] max-sm:h-[40px] max-sm:px-[12px] hover:bg-[#E5743E]"
          >
            모음 시작하기
          </button>
          <div className="flex justify-center items-center">
            <Image width={700} height={700} src={moeumDevice} alt="moeumDevice" className="w-[698px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
