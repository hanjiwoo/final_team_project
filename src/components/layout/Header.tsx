"use client";

import React, { useEffect, useState } from "react";
// import classNames from "classnames";
import { auth } from "@/shared/firebase";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  // // 로그인 상태 확인 테스트 버튼 함수
  // const checkLoginStatus = () => {
  //   const userString = localStorage.getItem("user");
  //   if (userString) {
  //     const user = JSON.parse(userString);
  //     alert(`${user.displayName}님은 현재 로그인 상태입니다.`);
  //   } else {
  //     console.log("로그인되어 있지 않습니다.");
  //   }
  // };

  // 로그아웃 버튼 함수
  const handleSignOut = () => {
    // Firebase Authentication을 사용하여 로그아웃 수행
    auth
      .signOut()
      .then(() => {
        // 로그아웃 성공 시 로컬 스토리지에서 사용자 정보 삭제
        localStorage.removeItem("user");
        alert("로그아웃 성공");
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };

  return (
    <nav className="bg-gray-00 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* 메뉴 */}
          <div className="flex space-x-4">
            <div>
              <a href="/" className="flex items-center py-5 px-2 text-gray-700">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    // d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                    clipRule="evenodd"
                  />
                </svg> */}
                <span className="font-bold">로고</span>
              </a>
            </div>
          </div>

          {/* 로그인 테스트 버튼
          <button onClick={checkLoginStatus}>로그인 상태 테스트입니다</button>
          <button onClick={handleSignOut}>로그아웃 테스트입니다</button> */}

          {/* 메뉴2 */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="/about"
              className="py-5 px-3 text-gray-700 hover:text-gray-400"
            >
              모음소개
            </a>
            <a
              href="/community"
              className="py-5 px-3 text-gray-700 hover:text-gray-400"
            >
              커뮤니티
            </a>
            {localStorage.getItem("user") ? (
              <>
                <a
                  href="/mypage"
                  className="py-5 px-3  text-gray-700 hover:text-gray-400"
                >
                  마이페이지
                </a>
                <a
                  href="/"
                  className="py-5 px-3  text-gray-700 hover:text-gray-400"
                  onClick={handleSignOut}
                >
                  로그아웃
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="py-5 px-3 text-gray-700 hover:text-gray-400"
                >
                  로그인
                </a>
                <a
                  href="/join"
                  className="w-[100px] h-10 py-3 px-2 bg-[#FF8145] hover:bg-[#E5743E] rounded-lg transition duration-300 justify-center items-center gap-1 inline-flex"
                >
                  <div className="text-right text-white text-sm font-medium font-['Pretendard'] leading-tight">
                    모-음 시작하기
                  </div>
                </a>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
        <a
          href="/community"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          커뮤니티
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
