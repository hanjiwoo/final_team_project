import React from "react";
import dummy from "../../app/assets/images/fakeLogo.jpg";
import Image from "next/image";
import heart from "../../app/assets/images/icon/heart_off.png";

const photo1 = dummy;
const photo2 = dummy;
const photo3 = dummy;
export const bestList = [
	{
		id: "1",
		title: "매장 이름",
		photo: photo1,
		추천해요: "여기는 따봉갯수",
	},
	{
		id: "2",
		title: "매장 이름",
		photo: photo2,
		추천해요: "여기는 따봉갯수",
	},
	{
		id: "3",
		title: "매장 이름",
		photo: photo3,
		추천해요: "여기는 따봉갯수",
	},
];

export default function Best() {
	return (
		<div className="container px-5 py-40 mx-auto">
			<div className="text-center mb-12">
				<h1 className="text-[28px] leading-[36px] text-[#212121] font-semibold mb-[12px]">
					이달의 Best 매장 모-음
				</h1>
				<span className="text-[18px] leading-[20px] font-[#5c5c5c]">
					인기 매장을 지금 바로 확인해보세요 :)
				</span>
			</div>

			<div className="flex justify-center items-center">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 gap-[24px]">
					{bestList.map((item) => {
						return (
							<div key={item.id}>
								<div className="h-full rounded-lg overflow-hidden hover:scale-105 transition ease-in transition-property: all transition-duration: 0.5s w-[344px] h-[324px]">
									<Image
										className="w-[344px] h-[324px] object-cover object-center rounded-[12px] mb-[20px]"
										src={item.photo}
										alt="photo"
									/>

									<span className=" text-[16px] text-[#212121] leading-[24px] font-semibold">
										{item.title}
									</span>
									<div className="mb-1 flex items-center gap-[4px] text-[#FF8145] text-[14px] leading-[20px]">
										<Image
											src={heart}
											alt="like"
											className="w-[20px] h-[20px]"
										/>
										{item.추천해요}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
