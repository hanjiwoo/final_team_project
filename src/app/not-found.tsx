"use client";
import Image from "next/image";
import React from "react";
import ErrorImage from "../app/assets/images/icon/404.png";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="flex  items-center justify-center w-full h-[100vh] ">
        <div className="flex flex-col items-center justify-center gap-[32px]  ">
          <Image className="h-[120px] w-[120px] max-sm:w-[80px] max-sm:h-[80px]" src={ErrorImage} alt="error"></Image>
          <div className="flex flex-col gap-[16px] text-center">
            <p className="text-[28px] font-semibold leading-[36px] max-sm:text-[20px]">
              원하시는 페이지를 찾을 수 없습니다
            </p>

            <div className="max-sm:hidden">
              <p className="text-[18px] leading-[26px] text-gray-500 ">
                찾으시려는 페이지 주소가 잘못 입력되었거나, 주소 변경 혹은 삭제로 인해 사용할 수 없습니다.
                <br />
                입력하신 주소가 올바른 주소인지 한번 더 확인해주세요.
              </p>
            </div>

            <div className="hidden max-sm:block">
              <p className="text-[18px] leading-[26px] text-gray-500 max-sm:text-[14px] max-sm:leading-[20px]">
                찾으시려는 페이지 주소가 잘못 입력되었거나, <br />
                주소 변경 혹은 삭제로 인해 사용할 수 없습니다.
                <br />
                입력하신 주소가 올바른 주소인지 한번 더 확인해주세요.
              </p>
            </div>
          </div>

          <button
            className="w-[160px] h-[48px] rounded-[8px] text-white bg-[#FF8145] hover:bg-[#E5743E]"
            onClick={() => {
              router.push("/");
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
