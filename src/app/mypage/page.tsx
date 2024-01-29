"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import rightIcon from "../assets/images/icon/right.png";
import profileImage from "../assets/images/icon/profile.png";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/config/configStore";
import { useSelector } from "react-redux";

export default function Mypage() {
  const user = useSelector((state: RootState) => state.login);
  const { displayName, email, uid, photoURL, isLogin } = user;
  // 화면 이동을 위한 useRouter()
  const router = useRouter();

  const handleClickProfileEdit = () => {
    router.push("/mypage/edit");
    console.log("edit으로 이동합니다");
  };
  const handleClickStores = () => {
    router.push("/mypage/stores");
  };
  const handleClickPosts = () => {
    router.push("/mypage/posts");
  };
  const handleClickComments = () => {
    router.push("/mypage/comments");
  };
  return (
    <div className="flex justify-center items-center w-full my-[60px] px-[20px] max-sm:my-[32px] max-lg:my-[60px]">
      <div className="w-[880px]">
        <div className="gap-[60px]">
          <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px]">
            내 정보
          </h1>
          <h2 className="mb-[24px] text-[#212121] font-semibold">
            나의 프로필
          </h2>
        </div>
        <div className="flex justify-between items-center rounded-[12px] border-2 p-[24px] border-[#D6D6D6] mb-[60px]">
          <div className="flex justify-center items-center gap-[12px]">
            {isLogin ? (
              <img
                src={photoURL}
                className="w-[60px] h-[60px] rounded-full"
                alt="흐음"
              />
            ) : (
              <Image
                src={profileImage}
                alt="more"
                className="w-[60px] h-[60px]"
              />
            )}
            <span className="text-[20px] leading-[36px] text-[#212121]">
              모두의 음식점
            </span>
          </div>
          <div
            className="w-[auto] h-[48px] text-[#fff] bg-[#FF8145] pt-[8px] pr-[16px] pb-[8px] pl-[16px] text-[14px] font-medium rounded-[8px] leading-[20px] cursor-pointer flex justify-center items-center"
            onClick={handleClickProfileEdit}
          >
            프로필 수정
          </div>
        </div>
        <div>
          <h2 className="mb-[24px] text-[#212121] font-semibold text-[20px]">
            나의 모-음
          </h2>
          <div className="flex flex-col gap-[16px]">
            <div className="  flex justify-between items-center pt-[12px] pb-[12px]">
              <span className="text-[18px] font-medium leading-[26px] text-[#5c5c5c]">
                매장
              </span>
              <Image
                src={rightIcon}
                alt="more"
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={handleClickStores}
              ></Image>
            </div>
            <div className="  flex justify-between items-center pt-[12px] pb-[12px]">
              <span className="text-[18px] font-medium leading-[26px] text-[#5c5c5c]">
                게시글
              </span>
              <Image
                src={rightIcon}
                alt="more"
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={handleClickPosts}
              />
            </div>
            <div className="  flex justify-between items-center pt-[12px] pb-[12px]">
              <span className="text-[18px] font-medium leading-[26px] text-[#5c5c5c]">
                댓글
              </span>
              <Image
                src={rightIcon}
                alt="more"
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={handleClickComments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
