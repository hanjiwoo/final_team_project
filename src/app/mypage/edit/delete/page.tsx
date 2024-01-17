"use client";
import { deleteUser, getAuth } from "firebase/auth";
import React, { useState } from "react";

export default function DeleteUser() {
  const auth = getAuth();
  const [ischeck, setIsCheck] = useState(false);
  const checkHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };
  const deleteUserHandler = () => {
    if (!ischeck) return alert("유의사항을 확인해주세요");
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (!result) return;

    if (auth.currentUser) {
      deleteUser(auth.currentUser)
        .then((res) => {
          alert(res);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return (
    <section className="h-[800px] flex justify-center items-center">
      <div className="bg-yellow-100 w-1/2 h-4/5">
        <h1 className="font-black">회원탈퇴</h1>
        <h3>모-음을 떠나시나요? 아래의 내용을 확인해주세요</h3>
        <section className="bg-red-100">
          <ul>
            <li>
              1.모두의 음식점을 탈퇴하시면 해당 아이디로 재가입이 불가능 합니다
            </li>
            <li>2.내가 저장한 매장 또는 커뮤니티 활동내역이 사라집니다.</li>
            <li>3.탈퇴 후 개인정보는 모두 삭제됩니다.</li>
          </ul>
        </section>
        <div className="flex gap-5">
          <input
            type="checkbox"
            checked={ischeck}
            onChange={(e) => checkHandeler(e)}
          />
          <p>모두의 음식점 탈퇴시 유의 사항을 모두 확인하였습니다.</p>{" "}
        </div>
        <div className="flex justify-center items-center">
          {" "}
          <button
            className="bg-orange-500 p-3 rounded-xl"
            onClick={deleteUserHandler}
          >
            탈퇴 완료
          </button>
        </div>
      </div>
    </section>
  );
}
