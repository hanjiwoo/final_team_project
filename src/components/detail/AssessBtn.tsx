"use client";
import React, { useState } from "react";
import { assessment } from "@/app/assets/types/types";

type typeOfForm = {
  맛: string;
  가격: string;
  서비스: string;
  위생: string;
};
export default function AssessBtn({
  item,
  form,
  setForm,
}: {
  item: assessment;
  form: typeOfForm;
  setForm: React.Dispatch<
    React.SetStateAction<{
      맛: string;
      가격: string;
      서비스: string;
      위생: string;
    }>
  >;
}) {
  const { title, one, two, three, type } = item;
  const [activeId, setActiveId] = useState("");
  const onclickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (e.currentTarget === e.target) return;
    //  setActiveHoogi(e.target.id)
    // console.log(e.currentTarget.innerHTML);
    setActiveId(e.currentTarget.id);
    setForm({ ...form, [type]: e.currentTarget.innerHTML });
    // console.log(form, "폼 확인");
  };
  // console.log(item);

  return (
    <>
      <h2>{title}</h2>
      <div className="flex flex-col gap-2 items-center">
        <div
          id="1"
          onClick={onclickHandler}
          className={`bg-${activeId === "1" ? "yellow" : "red"}-300 w-11/12`}
        >
          {one}
        </div>{" "}
        <div
          id="2"
          onClick={onclickHandler}
          className={`bg-${activeId === "2" ? "yellow" : "red"}-300 w-11/12`}
        >
          {two}
        </div>{" "}
        <div
          id="3"
          onClick={onclickHandler}
          className={`bg-${activeId === "3" ? "yellow" : "red"}-300 w-11/12`}
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
