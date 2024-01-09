"use client";
import React, { Fragment, useState } from "react";
import AssessBtn from "./AssessBtn";
type assessment = {
  title: string;
  one: string;
  two: string;
  three: string;
  four: string;
};
const assessmentList = [
  {
    title: "가격",
    one: "가격이 달라요",
    two: "적당해요",
    three: "저렴해요",
    four: "존마탱",
  },
  {
    title: "맛",
    one: "아쉬워요",
    two: "적당해요",
    three: "또갈래요",
    four: "존마탱",
  },
  {
    title: "서비스",
    one: "아쉬워요",
    two: "적당해요",
    three: "친절해요",
    four: "존마탱",
  },
  {
    title: "위생",
    one: "아쉬워요",
    two: "적당해요",
    three: "꺠끗해요",
    four: "존마탱",
  },
];

export default function Hoogi() {
  const [range, setRange] = useState("0");
  const [activeId, setActiveId] = useState("");

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(e.target.value);
  };

  const onclickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (e.currentTarget === e.target) return;
    //  setActiveHoogi(e.target.id)
    // console.log(e.currentTarget.innerHTML);
    setActiveId(e.currentTarget.id);
  };

  return (
    <div className="bg-blue-300 h-[300px] flex flex-col items-center">
      <div className="bg-red-300  h-[50px] flex ">
        <h1>해당 음식점에 리뷰를 남겨주세요</h1>
        <div className="bg-yellow-300 h-12">
          <input
            className="w-64 bg-yellow-300 "
            type="range"
            value={range}
            onChange={onchangeHandler}
            max={10}
            min={0}
            step={1}
          />
        </div>

        <div>{range}점</div>
      </div>
      <div className="flex flex-col  mb-32 pb-32 bg-indigo-300">
        {assessmentList.map((item: assessment) => {
          return (
            <React.Fragment key={item.title}>
              <AssessBtn item={item} />{" "}
            </React.Fragment>
          );
        })}
        {/* <AssessBtn />
        
        <AssessBtn /> */}
      </div>
    </div>
  );
}
