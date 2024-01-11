"use client";
import React, { Fragment, useState } from "react";
import AssessBtn from "./AssessBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { addHoogi } from "./queryFns";
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
    three: "깨끗해요",
    four: "존마탱",
  },
];

const fakeUser = {
  isLogin: true,
  uid: 1,
  name: "han",
};
const { uid } = fakeUser;
export default function Hoogi() {
  const [range, setRange] = useState("0");
  // const [activeId, setActiveId] = useState("");
  const [face, setFace] = useState("");
  const [form, setForm] = useState({
    맛: "",
    가격: "",
    서비스: "",
    위생: "",
  });
  const { 맛, 가격, 서비스, 위생 } = form;
  const { id: shopId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addHoogi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`hoogis${shopId}`] });
    },
  });

  const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(e.target.value);
  };

  // const onclickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   // if (e.currentTarget === e.target) return;
  //   //  setActiveHoogi(e.target.id)
  //   // console.log(e.currentTarget.innerHTML);
  //   setActiveId(e.currentTarget.id);
  // };
  const faceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.innerHTML === "이모티콘") return alert("no");

    setFace(e.target.value);
    // console.log(e.target, "이모티콘");
  };
  const submitHandler = () => {
    if (
      !맛 ||
      !가격 ||
      !위생 ||
      !서비스 ||
      range === "0" ||
      face === "이모티콘"
    )
      return alert("후기 선택을 전부 해주세요");

    mutateToAdd({ uid, shopId, 맛, 가격, 위생, 서비스, range, face });
    setFace("");
    /* setForm({
      맛: "",
      가격: "",
      서비스: "",
      위생: "",
    }); */
    setRange("0");
    alert("제출 완료");

    // console.log(맛, 가격, 위생, 서비스, range, face);
  };
  return (
    <div className="bg-blue-300 h-[300px] flex flex-col items-center mb-10">
      <div className="bg-red-300  h-[50px] flex ">
        <h1>해당 음식점에 리뷰를 남겨주세요</h1>
        <div className="bg-yellow-300 h-12">
          <input
            className="w-64 bg-yellow-300 "
            type="range"
            value={range}
            onChange={rangeHandler}
            max={10}
            min={0}
            step={1}
          />
        </div>
        <div>{range}점</div>
        <select value={face} onChange={(e) => faceHandler(e)}>
          <option>이모티콘</option>
          <option>😍</option>
          <option>😀</option>
          <option>🙂</option>
          <option>😐</option>
          <option>😅</option>
          <option>😥</option>
          <option>🤒</option>
          <option>👿</option>
        </select>
      </div>
      <div className="flex flex-col  mb-32  bg-indigo-300">
        {assessmentList.map((item: assessment) => {
          return (
            <React.Fragment key={item.title}>
              <AssessBtn item={item} form={form} setForm={setForm} />{" "}
            </React.Fragment>
          );
        })}
        {/* <AssessBtn />
        
        <AssessBtn /> */}{" "}
        <button className="bg-red-600 w-[500px] mt-5" onClick={submitHandler}>
          제출하기
        </button>
      </div>{" "}
    </div>
  );
}
