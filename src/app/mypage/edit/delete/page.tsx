"use client";
import { RootState } from "@/redux/config/configStore";
import { logout } from "@/redux/modules/loginSlice";
import { deleteUser, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteUser() {
  const auth = getAuth();
  const [ischeck, setIsCheck] = useState(false);
  const checkHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };
  const user = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const router = useRouter();
  const deleteUserHandler = () => {
    if (!ischeck)
      return toast.error("유의사항을 확인해주세요.", {
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

    const result = window.confirm("정말 삭제하시겠습니까?");
    if (!result) return;

    if (auth.currentUser) {
      deleteUser(auth.currentUser)
        .then(() => {
          toast.success("회원탈퇴가 완료되었습니다.");

          dispatch(logout("로그아웃"));
          router.push("/");
        })
        .catch((error) => {
          toast.error(`${error}, 탈퇴를 위해 재로그인이 필요합니다.`);
        });
    }
  };
  if (!auth.currentUser?.uid) {
    return <>로그인을 해주세요</>;
  }
  if (user.isKakao) {
    return <div> 카카오 접속자는 이용하실수 없습니다.</div>;
  }
  return (
    <section className="flex justify-center my-[60px] px-[20px] w-full">
      <div className="w-[880px]">
        <section className="flex gap-[16px] flex-col ">
          <h1 className="text-[#212121] text-[28px] font-semibold leading-[36px]">회원탈퇴</h1>
          <h3 className="text-[#5C5C5C] text-[18px] font-semibold leading-[26px] max-sm:text-[16px] max-sm:leading-[24px]">
            모음을 떠나시나요? 아래의 내용을 확인해주세요.
          </h3>
        </section>
        <section className="rounded-[12px] border-2 border-[#D6D6D6] p-[24px] mb-[24px] mt-[52px] max-sm:mt-[32px]">
          <ul className="flex flex-col gap-[12px] text-[16px] text-[#5C5C5C] leading-[24px] max-sm:text-[14px] max-sm:leading-[20px] justify-center">
            <li>1. 모음을 탈퇴하시면 해당 아이디로 재가입이 불가능 합니다.</li>
            <li>2. 내가 저장한 매장 또는 커뮤니티 활동내역이 사라집니다.</li>
            <li>3. 탈퇴 후 개인정보는 모두 삭제됩니다.</li>
          </ul>
        </section>
        <section className="flex gap-[12px] mb-[52px] items-center">
          <input
            type="checkbox"
            checked={ischeck}
            onChange={(e) => checkHandeler(e)}
            className="accent-[#FF8145] w-[20px] h-[20px]"
          />
          <p className="text-[16px] leading-[24px] text-[#212121] max-sm:text-[14px]">
            모음 탈퇴 시 유의 사항을 모두 확인하였습니다.
          </p>
        </section>
        <div className="flex justify-center items-center">
          <button
            className="bg-[#FF8145] hover:bg-[#E5743E] px-[16px] rounded-[8px] text-[#fff] text-[14px] leading-[20px] w-[160px] h-[48px]"
            onClick={deleteUserHandler}
          >
            탈퇴 완료
          </button>
        </div>
      </div>
    </section>
  );
}
