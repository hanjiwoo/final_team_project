"use client";
import React from "react";
import Image from "next/image";
import profileImage from "../../assets/images/icon/profile.png";
import cameraImage from "../../assets/images/icon/camera.png";

export default function page() {
	return (
		<div className="flex justify-center items-center mt-[60px] mb-[60px]">
			<div className="flex flex-col justify-center items-center w-[350px] h-[545px]">
				<form>
					<Image
						src={profileImage}
						alt="profile"
						className="w-[100px] h-[100px]"
					/>
					<Image
						src={cameraImage}
						alt="profileImageEditButton"
						className="w-[32px] h-[32px] relative top-[-30px] right-[-70px] cursor-pointer"
					/>
				</form>
				<form className="flex flex-col w-full mb-[40px] mt-[40px] gap-[16px]">
					<div className="flex flex-col w-full gap-[8px]">
						<label className="test-[14px] leading-20px text-[#999]">
							이메일
						</label>
						<div className="h-[48px] px-[16px] rounded-[8px] border-solid border border-[#C2C2C2] flex items-center bg-[#F1F1F1] text-[#C2C2C2]">
							example@moeum.com
						</div>
					</div>
					<div className="flex flex-col w-full gap-[8px]">
						<label className="test-[14px] leading-20px text-[#999]">
							닉네임
						</label>
						<input
							className="h-[48px] px-[16px] rounded-[8px] border-solid border border-[#C2C2C2]"
							type="text"
							name="nickName"
							required
							placeholder="모두의 모음"
						></input>
					</div>
					<div className="flex flex-col w-full gap-[8px]">
						<label className="test-[14px] leading-20px text-[#999]">
							비밀번호
						</label>
						<input
							className="h-[48px] px-[16px] rounded-[8px] border-solid border border-[#C2C2C2]"
							type="password"
							name="password"
							required
							placeholder="비밀번호를 입력해주세요"
						></input>
					</div>
				</form>
				<form className="w-full">
					<button className=" flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#fff] bg-[#FF8145] mb-[36px]">
						저장하기
					</button>
				</form>
				<form className="w-full">
					<span className="text-neutral-400 text-sm font-medium leading-tight underline decoration-solid cursor-pointer">
						탈퇴하기
					</span>
				</form>
			</div>
		</div>
	);
}
