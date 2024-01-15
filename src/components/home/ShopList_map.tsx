"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ShopList_map() {
  const [toggle, setToggle] = useState(true);
  const shop = useSelector((state: any) => state.shops);
  const toggleHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!shop[0]) {
      return alert("검색부터 해주세요");
    }
    if (e.currentTarget.id === "1") {
      setToggle(true);
    } else if (e.currentTarget.id === "2") {
      setToggle(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center  gap-10">
        <button
          id="1"
          className="bg-black text-white"
          onClick={(e) => toggleHandler(e)}
        >
          리스트보기
        </button>
        <button
          id="2"
          className="bg-black text-white"
          onClick={(e) => toggleHandler(e)}
        >
          지도보기
        </button>
      </div>
    </>
  );
}
