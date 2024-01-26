import React from "react";
import "./layout.css";

export default function Footer() {
	return (
		<div className="bg-[#fff] w-full h-[224px] flex justify-center items-center border-t-[1px] border-[##E1E1E1] py-[40px] px-[20px]">
			<div className="md:flex md:justify-between w-[1080px] items-center">
				<section className="flex flex-col gap-[24px]">
					<h2 className="text-[#7a7a7a] text-[16px] leading-[24px] font-semibold">
						찾아오시는 길
					</h2>
					<section className="flex gap-[12px] flex-col">
						<div className="flex gap-[8px]">
							<span className="text-[14px] text-[#999] leading-[20px]">팀</span>
							<span className="text-[14px] text-[#999] leading-[20px]">|</span>
							<span className="text-[14px] text-[#999] leading-[20px]">
								2만큼 성장했죠
							</span>
						</div>
						<div className="flex gap-[8px]">
							<span className="text-[14px] text-[#999] leading-[20px]">
								팀원
							</span>
							<span className="text-[14px] text-[#999] leading-[20px]">|</span>
							<span className="text-[14px] text-[#999] leading-[20px]">
								리더 여인준 부리더 이아름 팀원 이상욱 팀원 한지우 디자이너
								이가현
							</span>
						</div>
					</section>
					<span className="text-[14px] text-[#999] leading-[20px]">
						Copyright ⓒ 2024 2만큼성장했조. All Rights Reserved.
					</span>
				</section>
				<section className="text-[32px] text-[#999] leading-normal font-bold flex md:justify-center items-center">
					<span className="mt-[24px]">모음</span>
				</section>
			</div>
		</div>
	);
}
