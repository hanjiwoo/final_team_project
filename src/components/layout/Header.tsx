"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/shared/firebase";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { login, loginKakao, logout } from "@/redux/modules/loginSlice";
import Image from "next/image";
import moeumLogo from "../../app/assets/images/moeumLogo.png";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import community from "../../app/assets/images/menu/community.png";
import map from "../../app/assets/images/menu/map.png";
import about from "../../app/assets/images/menu/store.png";
import my from "../../app/assets/images/menu/my.png";
import profileImage from "../../app/assets/images/icon/profile.png";
import right from "../../app/assets/images/icon/right.png";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { isLogin, uid, email, photoURL, displayName, isKakao } = useSelector((state: RootState) => state.login);
  const { data: session } = useSession();
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
  // console.log(session, "세션을 보아용");
  useEffect(() => {
    if (session) {
      dispatch(loginKakao(session.user));
    }
  }, [session]);
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

  // mobile 버튼 함수들
  const aboutBtn = () => {
    router.push("/about");
    setMenuToggle(!menuToggle);
  };

  const mapBtn = () => {
    router.push("/map");
    setMenuToggle(!menuToggle);
  };

  const communityBtn = () => {
    router.push("/community");
    setMenuToggle(!menuToggle);
  };

  const mypageBtn = () => {
    router.push("/mypage");
    setMenuToggle(!menuToggle);
  };

  const router = useRouter();
  const buttonStyle = "text-[16px] py-5 px-3 text-gray-700 hover:text-gray-400 cursor-pointer";
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
                <Image
                  width={300}
                  height={300}
                  src={moeumLogo}
                  alt="logo"
                  className="w-[72px] h-[24px] cursor-pointer"
                />
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
                  className="w-[100px] h-10 border-[1px] border-[#ff8145] hover:bg-[#ff8145] rounded-lg transition duration-300 justify-center items-center gap-1 inline-flex"
                >
                  <span className="text-[20px] max-sm:text-[12px] text-[#ff8145] hover:text-[white] text-sm leading-tight">
                    모음 시작하기
                  </span>
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
      <div className="absolute z-[100] bg-[#fff] w-full shadow-xl">
        <div className={`md:hidden ${!menuToggle ? "hidden" : ""}`}>
          <div className="flex h-[80px] justify-between items-center px-[20px] py-[17px] border-[#D6D6D6] mb-[8px]">
            <div className="flex justify-center items-center gap-[12px]">
              {isLogin ? (
                <>
                  <img
                    src={photoURL}
                    className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px] rounded-full"
                    alt="프로필사진"
                  />
                  <span className="text-[18px] leading-[36px]">{displayName}</span>
                  {/* <span className="text-[18px] leading-[36px]">님의 모음</span> */}
                </>
              ) : (
                <>
                  <Image
                    width={100}
                    height={100}
                    src={profileImage}
                    alt="more"
                    className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
                  />
                  <div className="text-[18px] leading-[36px]">로그인 후 이용해 주세요.</div>
                  <div
                    className=""
                    onClick={() => {
                      router.push("/login");
                      setMenuToggle(!menuToggle);
                    }}
                  >
                    {/* <Image src={right} alt="more" className="w-[24px] h-[24px] max-sm:w-[24px] max-sm:h-[24px]" /> */}
                    <Image
                      width={100}
                      height={100}
                      src={right}
                      alt="more"
                      className="w-[20px] h-[20px] cursor-pointer max-sm:w-[16px] max-sm:h-[16px]"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            onClick={aboutBtn}
            className="cursor-pointer flex items-center h-[55px] py-2 px-4 text-sm hover:bg-[#FFF2EC]"
          >
            <Image width={100} height={100} className="w-[24px] h-[24px]" src={about} alt="소개"></Image>
            <div className="ml-2 text-[16px]">모음소개</div>
          </div>
          <div
            onClick={mapBtn}
            className="cursor-pointer flex items-center h-[55px] py-2 px-4 text-sm hover:bg-[#FFF2EC]"
          >
            <Image width={100} height={100} className="w-[24px] h-[24px]" src={map} alt="지도"></Image>
            <div className="ml-2 text-[16px]">지도모음</div>
          </div>
          <div
            onClick={communityBtn}
            className="cursor-pointer flex items-center h-[55px] py-2 px-4 text-sm hover:bg-[#FFF2EC]"
          >
            <Image width={100} height={100} className="w-[24px] h-[24px]" src={community} alt="커뮤"></Image>
            <div className="ml-2 text-[16px]">커뮤니티</div>
          </div>
          {uid ? (
            <>
              <div
                onClick={mypageBtn}
                className="cursor-pointer flex items-center h-[55px] py-2 px-4 text-sm hover:bg-[#FFF2EC]"
              >
                <Image width={100} height={100} className="w-[24px] h-[24px]" src={my} alt="마이"></Image>
                <div className="ml-2 text-[16px]">마이모음</div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
