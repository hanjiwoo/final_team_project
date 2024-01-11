"use client";
import React, { useState } from "react";
import ShopList from "./ShopList";
import MapHome from "./MapHome";

export default function ShopList_map() {
  const [toggle, setToggle] = useState(true);

  const toggleHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.id === "1") {
      setToggle(true);
    } else if (e.currentTarget.id === "2") {
      setToggle(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center gap-10">
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
      <div>{toggle ? <ShopList /> : <MapHome />}</div>
    </>
  );
}
