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
		setForm({ ...form, [type]: e.currentTarget.id });
		// console.log(form, "폼 확인");
	};
	// console.log(item);

	return (
		<>
			<form className="flex flex-col w-full gap-[20px]">
				<h2>{title}</h2>
				<div className="flex  gap-2 justify-center w-full">
					<div
						id="1"
						onClick={onclickHandler}
						className={`text-${activeId === "1" ? "[#fff]" : "[#5C5C5C]"} bg-${
							activeId === "1" ? "[#FF8145]" : "[#fff]"
						} w-1/3 h-[48px] flex items-center px-[16px] rounded-[8px] border-[1px] border-[#D6D6D6]`}
					>
						{one}
					</div>{" "}
					<div
						id="2"
						onClick={onclickHandler}
						className={`text-${activeId === "2" ? "[#fff]" : "[#5C5C5C]"} bg-${
							activeId === "2" ? "[#FF8145]" : "[#fff]"
						} w-1/3 h-[48px] flex items-center px-[16px] rounded-[8px] border-[1px] border-[#D6D6D6]`}
					>
						{two}
					</div>{" "}
					<div
						id="3"
						onClick={onclickHandler}
						className={`text-${activeId === "3" ? "[#fff]" : "[#5C5C5C]"} bg-${
							activeId === "3" ? "[#FF8145]" : "[#fff]"
						} w-1/3 h-[48px] flex items-center px-[16px] rounded-[8px] border-[1px] border-[#D6D6D6]`}
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
			</form>
		</>
	);
}
