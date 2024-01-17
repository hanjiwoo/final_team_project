"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import storeMainIcon from "../../assets/images/icon/SFIcon.png";
import StoreDataOn from "../../../components/mypage/StoreDataOn";
import StoreDataOff from "../../../components/mypage/StoreDataOff";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";

export default function Page() {
  const user = useSelector((state: RootState) => state.login);
  const { displayName, email, uid, photoURL } = user;
  const [dataOn, setDataOn] = useState<boolean>(false);
  const handleClickDataChange = () => {
    setDataOn(!dataOn);
    console.log({ dataOn });
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="flex justify-center w-[100px] rounded-[8px] h-[48px] items-center text-[#fff] bg-[#FF8145]"
          onClick={handleClickDataChange}
        >
          data
        </button>
      </div>
      <div>{dataOn ? <StoreDataOn /> : <StoreDataOff />}</div>;
    </>
  );
}
