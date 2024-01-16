"use client";
import React, { Fragment, useState } from "react";
import AssessBtn from "./AssessBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { addHoogi } from "./queryFns";
type assessment = {
  title: string;
  type: string;
  one: string;
  two: string;
  three: string;
  four: string;
};
const assessmentList = [
  {
    title: "가격은 어떤가요?",
    type: "가격",
    one: "👍 저렴해요",
    two: "😎 괜찮아요",
    three: "💳 가격이 달라요",
    four: "존마탱",
  },
  {
    title: "맛있었나요?",
    type: "맛",
    one: "😋 또 가고싶어요",
    two: "🍽️ 괜찮아요",
    three: "🤔 아쉬워요",
    four: "존마탱",
  },
  {
    title: "서비스는 좋았나요?",
    type: "서비스",
    one: "💖 친절해요",
    two: "👨‍🍳 괜찮아요",
    three: "😢 아쉬워요",
    four: "존마탱",
  },
  {
    title: "위생은 청결했나요?",
    type: "위생",
    one: "✨ 깨끗해요",
    two: "💦 괜찮아요",
    three: "😨 아쉬워요",
    four: "존마탱",
  },
];

const fakeUser = {
  isLogin: true,
  uid: 1,
  name: "han",
};
const { uid } = fakeUser;
export default function Hoogi({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [range, setRange] = useState("0");
  // const [activeId, setActiveId] = useState("");
  // const [face, setFace] = useState("");
  const [form, setForm] = useState({
    맛: "",
    가격: "",
    서비스: "",
    위생: "",
  });
  // console.log(form);
  const { 맛, 가격, 서비스, 위생 } = form;
  const { id: shopId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addHoogi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`hoogis${shopId}`] });
    },
  });

  // const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRange(e.target.value);
  // };

  // const onclickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   // if (e.currentTarget === e.target) return;
  //   //  setActiveHoogi(e.target.id)
  //   // console.log(e.currentTarget.innerHTML);
  //   setActiveId(e.currentTarget.id);
  // };
  // const faceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.innerHTML === "이모티콘") return alert("no");

  //   setFace(e.target.value);
  //   // console.log(e.target, "이모티콘");
  // };
  const submitHandler = () => {
    // console.log(uid, shopId, 맛, 가격, 위생, 서비스, range, face);
    if (
      !맛 ||
      !가격 ||
      !위생 ||
      !서비스
      // range === "0" ||
      // face === "이모티콘"
    )
      return alert("후기 선택을 전부 해주세요");

    mutateToAdd({ uid, shopId, 맛, 가격, 위생, 서비스 });
    // setFace("");
    /* setForm({
      맛: "",
      가격: "",
      서비스: "",
      위생: "",
    }); */
    // setRange("0");
    alert("제출 완료");
    setModal(false);

    // console.log(맛, 가격, 위생, 서비스, range, face);
  };
  return (
    <div className="bg-blue-300 h-[600px] flex flex-col items-center mb-10">
      <div className="bg-red-300  h-[50px] flex ">
        <h1>오늘 방문한 매장은 어떤가요?</h1>
        <div className="bg-yellow-300 h-12">
          {/* <input
            className="w-64 bg-yellow-300 "
            type="range"
            value={range}
            onChange={rangeHandler}
            max={10}
            min={0}
            step={1}
          /> */}
        </div>
        {/* <div>{range}점</div> */}
        {/* <select value={face} onChange={(e) => faceHandler(e)}>
          <option>이모티콘</option>
          <option>😍</option>
          <option>😀</option>
          <option>🙂</option>
          <option>😐</option>
          <option>😅</option>
          <option>😥</option>
          <option>🤒</option>
          <option>👿</option>
        </select> */}
      </div>
      <div className="flex flex-col  mb-32  bg-indigo-300 w-[800px]">
        <section className="flex justify-between">
          <h1 className="text-2xl">해당 매장의 #태그 리뷰를 확인해보세요 :)</h1>
          <button className="bg-red-600 w-[100px] mt-5" onClick={submitHandler}>
            제출하기
          </button>
        </section>
        {assessmentList.map((item: assessment) => {
          return (
            <React.Fragment key={item.title}>
              <AssessBtn item={item} form={form} setForm={setForm} />{" "}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
