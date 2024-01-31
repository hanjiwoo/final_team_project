"use client";
import { logout } from "@/redux/modules/loginSlice";
import { deleteUser, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DeleteUser() {
  const auth = getAuth();
  const [ischeck, setIsCheck] = useState(false);
  const checkHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const deleteUserHandler = () => {
    if (!ischeck) return toast.error("유의사항을 확인해주세요");

    const result = window.confirm("정말 삭제하시겠습니까?");
    if (!result) return;

    if (auth.currentUser) {
      deleteUser(auth.currentUser)
        .then(() => {
          alert("적용완료");

          dispatch(logout("로그아웃"));
          router.push("/");

        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return (
    <section className="h-[784px] flex justify-center my-[60px] px-[20px] w-full">
      <div className="w-[880px]">
        <section className="flex gap-[16px] flex-col ">
          <h1 className="text-[#212121] text-[28px] font-semibold leading-[36px]">회원탈퇴</h1>
          <h3 className="text-[#5C5C5C] text-[18px] font-semibold leading-[26px]">

            모음을 떠나시나요? 아래의 내용을 확인해주세요

          </h3>
        </section>
        <section className="rounded-[12px] border-2 border-[#D6D6D6] p-[24px] mb-[24px] mt-[52px]">
          <ul className="flex flex-col gap-[12px] text-[16px] text-[#5C5C5C] leading-[24px]">
            <li>1.모두의 음식점을 탈퇴하시면 해당 아이디로 재가입이 불가능 합니다</li>
            <li>2.내가 저장한 매장 또는 커뮤니티 활동내역이 사라집니다.</li>
            <li>3.탈퇴 후 개인정보는 모두 삭제됩니다.</li>
          </ul>
        </section>
        <section className="flex gap-5 mb-[52px] items-center">
          <input
            type="checkbox"
            checked={ischeck}
            onChange={(e) => checkHandeler(e)}
            className="accent-[#FF8145] w-[20px] h-[20px]"
          />
          <p className="text-[16px] leading-[24px] text-[#212121]">
            모두의 음식점 탈퇴시 유의 사항을 모두 확인하였습니다.
          </p>{" "}
        </section>
        <div className="flex justify-center items-center">
          <button
            className="bg-[#FF8145] px-[16px] rounded-[8px] text-[#fff] text-[14px] leading-[20px] w-[160px] h-[48px]"
            onClick={deleteUserHandler}
          >
            탈퇴 완료
          </button>
        </div>
      </div>
    </section>
  );
}
