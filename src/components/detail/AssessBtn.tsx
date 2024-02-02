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
  setForm
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
    setActiveId(e.currentTarget.id);
    setForm({ ...form, [type]: e.currentTarget.id });
  };
  return (
    <>
      <form className="flex flex-col w-full gap-[20px]">
        <h2 className="text-[16px] leading-[24px] font-semibold">{title}</h2>
        <div className="flex gap-2 justify-center w-full max-sm:flex-col">
          <div
            id="1"
            onClick={onclickHandler}
            className={`text-${activeId === "1" ? "[#5C5C5C]" : "[#5C5C5C]"} bg-${
              activeId === "1" ? "[#FFF2EC]" : "[#fff]"
            } w-1/3 h-[48px] flex items-center px-[16px] rounded-[8px] border-[1px] border-[#D6D6D6] text-[14px] leading-[20px] max-sm:leading-[16px] max-sm:w-full`}
          >
            {one}
          </div>
          <div
            id="2"
            onClick={onclickHandler}
            className={`text-${activeId === "2" ? "[#5C5C5C]" : "[#5C5C5C]"} bg-${
              activeId === "2" ? "[#FFF2EC]" : "[#fff]"
            } w-1/3 h-[48px] flex items-center px-[16px] rounded-[8px] border-[1px] border-[#D6D6D6] text-[14px] leading-[20px] max-sm:leading-[16px] max-sm:w-full`}
          >
            {two}
          </div>
          <div
            id="3"
            onClick={onclickHandler}
            className={`text-${activeId === "3" ? "[#5C5C5C]" : "[#5C5C5C]"} bg-${
              activeId === "3" ? "[#FFF2EC] " : "[#fff]"
            } w-1/3 h-[48px] flex items-center px-[16px] rounded-[8px] border-[1px] border-[#D6D6D6] text-[14px] leading-[20px] max-sm:leading-[16px] max-sm:w-full`}
          >
            {three}
          </div>
        </div>
      </form>
    </>
  );
}
