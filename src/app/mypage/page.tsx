"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import rightIcon from "../assets/images/icon/right.png";
import profileImage from "../assets/images/icon/profile.png";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/config/configStore";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "@/shared/firebase";
import { logout } from "@/redux/modules/loginSlice";
import { toast, ToastContainer, Slide } from "react-toastify";
import basicProfileImage from "../../../public/Favicon_32_32.png";
import "react-toastify/dist/ReactToastify.css";
import kakao from "../assets/images/icon/kakao.png";
import { signOut } from "next-auth/react";
export default function Mypage() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.login);
  const { displayName, email, uid, photoURL, isLogin, isKakao } = user;
  // 화면 이동을 위한 useRouter()
  const router = useRouter();

  const handleClickProfileEdit = () => {
    router.push("/mypage/edit");
    // console.log("edit으로 이동합니다");
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

  // 로그아웃 버튼 함수
  const handleSignOut = () => {
    // Firebase Authentication을 사용하여 로그아웃 수행
    dispatch(logout("한지우가 다녀감 ㅋㅋ"));
    if (!isKakao) {
      auth
        .signOut()
        .then(() => {
          // 로그아웃 성공 시 로컬 스토리지에서 사용자 정보 삭제
          localStorage.removeItem("user");
          // alert("로그아웃 성공");
          toast.success(`로그아웃 성공`, {
            transition: Slide,
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          router.replace("/");
        })

        .catch((error) => {
          console.error("로그아웃 실패:", error);
        });
    }
    if (isKakao) {
      signOut().then(() => {
        toast.success("로그아웃 성공");
        router.replace("/");
      });
    }
  };
  useEffect(() => {
    if (!isLogin) {
      return router.push("/");
    }
  }, []);
  if (!isLogin) {
    return <>로그인을 해주세요</>;
  }
  return (
    <div className="flex justify-center items-center w-full my-[60px] px-[20px] max-sm:my-[32px] max-lg:my-[60px]">
      <div className="w-[880px]">
        <div className="gap-[60px]">
          <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px] max-sm:hidden">내 정보</h1>
          <h2 className="mb-[24px] text-[#212121] font-semibold">나의 프로필</h2>
        </div>
        <div className="flex justify-between items-center rounded-[12px] border-2 p-[24px] border-[#D6D6D6] mb-[60px] max-sm:mb-[32px]">
          <div className="flex justify-center items-center gap-[12px]">
            {isLogin ? (
              <img
                src={photoURL}
                className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px] rounded-full"
                alt="카카오"
              />
            ) : (
              <Image src={profileImage} alt="more" className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]" />
            )}
            <span className="text-[20px] leading-[36px] text-[#212121] max-sm:text-[14px]">{displayName}</span>
          </div>

          {isKakao ? (
            <Image src={kakao} alt="카카오" width={48}></Image>
          ) : (
            <div
              className="w-[auto] h-[48px] text-[#fff] bg-[#FF8145] pt-[8px] pr-[16px] pb-[8px] pl-[16px] text-[14px] font-medium rounded-[8px] leading-[20px] cursor-pointer flex justify-center items-center"
              onClick={handleClickProfileEdit}
            >
              프로필 수정
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-[24px] text-[#212121] font-semibold text-[20px] max-sm:text-[16px] max-sm:leading-[24px]">
            나의 모음
          </h2>
          <div className="flex flex-col gap-[16px]">
            <div
              onClick={handleClickStores}
              className=" cursor-pointer flex justify-between items-center pt-[12px] pb-[12px]"
            >
              <span className="text-[18px] font-medium leading-[26px] text-[#5c5c5c] max-sm:text-[14px] max-sm:leading-[20px]">
                매장
              </span>
              <Image src={rightIcon} alt="more" className="w-[20px] h-[20px] max-sm:w-[16px] max-sm:h-[16px]"></Image>
            </div>
            <div
              onClick={handleClickPosts}
              className=" cursor-pointer flex justify-between items-center pt-[12px] pb-[12px]"
            >
              <span className="text-[18px] font-medium leading-[26px] text-[#5c5c5c] max-sm:text-[14px] max-sm:leading-[20px]">
                게시글
              </span>
              <Image
                src={rightIcon}
                alt="more"
                className="w-[20px] h-[20px] cursor-pointer max-sm:w-[16px] max-sm:h-[16px]"
                onClick={handleClickPosts}
              />
            </div>
            <div
              onClick={handleClickComments}
              className=" cursor-pointer flex justify-between items-center pt-[12px] pb-[12px]"
            >
              <span className="text-[18px] font-medium leading-[26px] text-[#5c5c5c] max-sm:text-[14px] max-sm:leading-[20px]">
                댓글
              </span>
              <Image
                src={rightIcon}
                alt="more"
                className="w-[20px] h-[20px] cursor-pointer max-sm:w-[16px] max-sm:h-[16px]"
                onClick={handleClickComments}
              />
            </div>
            <div
              className="  flex justify-between items-center pt-[12px] pb-[12px] cursor-pointer md:hidden"
              onClick={handleSignOut}
            >
              <span className="text-[14px] font-medium leading-[20px] text-[#5c5c5c]">로그아웃</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
