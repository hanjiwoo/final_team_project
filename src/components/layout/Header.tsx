"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/shared/firebase";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { login, logout } from "@/redux/modules/loginSlice";
import Image from "next/image";
import moeumLogo from "../../app/assets/images/moeumLogo.png";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { isLogin, uid, email, photoURL } = useSelector((state: RootState) => state.login);
  // console.log(isLogin, uid, email, photoURL, " 일단 잘들어오냐?");
  const dispatch = useDispatch();
  // 로그인 상태 확인 테스트 버튼 함수
  const checkLoginStatus = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      alert(`${user.displayName}님은 현재 로그인 상태입니다.`);
    } else {
      console.log("로그인되어 있지 않습니다.");
    }
  };

  // 로그아웃 버튼 함수
  const handleSignOut = () => {
    // Firebase Authentication을 사용하여 로그아웃 수행
    dispatch(logout("한지우가 다녀감 ㅋㅋ"));
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
  };
  useEffect(() => {
    if (window && localStorage.getItem("uid")) {
      const originUser = {
        isLogin: Boolean(localStorage.getItem("uid")),
        displayName: localStorage.getItem("displayName"),
        uid: localStorage.getItem("uid"),
        photoURL: localStorage.getItem("photoURL"),
        email: localStorage.getItem("email")
      };
      dispatch(login(originUser));
    }
  }, []);

  const router = useRouter();

  const buttonStyle = "py-5 px-3 text-gray-700 hover:text-gray-400 cursor-pointer";
  return (
    <nav className="bg-gray-00 w-full bg-[#fff]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* 메뉴 */}
          <div className="flex space-x-4">
            <div>
              <div
                className="flex items-center py-5 px-2 text-gray-700"
                onClick={() => {
                  router.push("/");
                }}
              >
                <Image src={moeumLogo} alt="logo" className="w-[72px] h-[24px]" />
              </div>
            </div>
          </div>

          {/* 메뉴2 */}
          <div className="hidden md:flex items-center space-x-1">
            <div
              className={buttonStyle}
              onClick={() => {
                router.push("/about");
              }}
            >
              모음소개
            </div>
            <div
              className={buttonStyle}
              onClick={() => {
                router.push("/community");
              }}
            >
              커뮤니티
            </div>
            {uid ? (
              <>
                <div
                  className={buttonStyle}
                  onClick={() => {
                    router.push("/mypage");
                  }}
                >
                  마이모음
                </div>
                <div className={buttonStyle} onClick={handleSignOut}>
                  로그아웃
                </div>
              </>
            ) : (
              <>
                <div
                  className={buttonStyle}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  로그인
                </div>
                <div
                  onClick={() => {
                    router.push("/join");
                  }}
                  className="w-[100px] h-10 py-3 px-2 bg-[#FF8145] hover:bg-[#E5743E] rounded-lg transition duration-300 justify-center items-center gap-1 inline-flex"
                >
                  <div className="text-right text-white text-sm font-medium font-['Pretendard'] leading-tight">
                    시작하기
                  </div>
                </div>
              </>
            )}
          </div>

          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu items */}
      <div className={`md:hidden ${!menuToggle ? "hidden" : ""}`}>
        <a href="/about" className="block py-2 px-4 text-sm hover:bg-gray-200">
          모음소개
        </a>
        <a href="/map" className="block py-2 px-4 text-sm hover:bg-gray-200">
          지도모음
        </a>
        <a href="/community" className="block py-2 px-4 text-sm hover:bg-gray-200">
          커뮤니티
        </a>
        <a href="/mypage" className="block py-2 px-4 text-sm hover:bg-gray-200">
          마이모음
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
