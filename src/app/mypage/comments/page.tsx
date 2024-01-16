"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import storeMainIcon from "../../assets/images/icon/SFIcon.png";
import CommentsDataOff from "./CommentsDataOff";
import CommentsDataOn from "./CommentsDataOn";

export default function Page() {
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
			<div>{dataOn ? <CommentsDataOn /> : <CommentsDataOff />}</div>;
		</>
	);
}
