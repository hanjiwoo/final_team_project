"use client";
import React, { useState } from "react";
import { assessment } from "@/app/assets/types/types";

export default function AssessBtn({ item }: { item: assessment }) {
  const [activeId, setActiveId] = useState("");
  const onclickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (e.currentTarget === e.target) return;
    //  setActiveHoogi(e.target.id)
    // console.log(e.currentTarget.innerHTML);
    setActiveId(e.currentTarget.id);
  };
  // console.log(item);
  const { title, one, two, three } = item;
  return (
    <>
      {<h2>{title}</h2>}
      <div className="flex gap-10">
        <div
          id="1"
          onClick={onclickHandler}
          className={`bg-${activeId === "1" ? "yellow" : "red"}-300`}
        >
          {one}
        </div>{" "}
        <div
          id="2"
          onClick={onclickHandler}
          className={`bg-${activeId === "2" ? "yellow" : "red"}-300`}
        >
          {two}
        </div>{" "}
        <div
          id="3"
          onClick={onclickHandler}
          className={`bg-${activeId === "3" ? "yellow" : "red"}-300`}
        >
          {three}
        </div>
        {/* <div
          id="4"
          onClick={onclickHandler}
          className={`bg-${activeId === "4" ? "yellow" : "red"}-300`}
        >
          존맛탱
        </div> */}
      </div>
    </>
  );
}
