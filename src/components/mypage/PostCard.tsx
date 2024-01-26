"use client";
import Image from "next/image";
import React from "react";
import userIcon from "../../app/assets/images/icon/userIcon.png";
import fakelogo from "../../app/assets/images/fakeLogo.jpg";
import CuteHeart from "../community/CuteHeart";
import { useRouter } from "next/navigation";
import { Post } from "@/app/assets/types/types";
export default function PostCard({ post }: { post: Post }) {
	const router = useRouter();
	const moveToDetail = (id: string) => {
		router.push(`/community/detail/${id}`);
	};
	// console.log(post.photos?.[0], " 이걸 찍어봅세");
	return (
		<div className="w-full">
			<div className="w-full flex justify-center">
				<div
					className="cursor-pointer w-[680px] rounded-[8px] "
					onClick={() => moveToDetail(post.id)}
				>
					{/* 카테고리 */}

					<p className="text-[#212121] leading-[14px] py-[4px] px-[8px] bg-[#F1F1F1] rounded-[100px] text-[10px] flex justify-center items-center w-[60px]">
						{post.category}
					</p>

					<div className="flex h-[132px] flex-col gap-[8px]">
						<div className="flex h-[100px] justify-between items-center w-full mt-[8px]">
							{/* 제목 컨테이너 */}

							<div className="flex flex-col justify-start gap-[12px]">
								<div className="text-[16px] text-center font-semibold leading-[24px] text-[#212121]">
									<p className="text-left">{post.title}</p>
								</div>

								{/* 내용 컨테이너 */}
								<div className="text-[14px] font-medium leading-[20px] text-[#5C5C5C]  overflow-ellipsis w-[336px] line-clamp-2">
									<p className="text-[14px] leading-[20px] text-[#5C5C5C]">
										{post.content}
									</p>
								</div>
							</div>

							{/* 사진컨테이너 */}
							<div className="w-[100px] h-[100px] bg-[#F1F1F1] rounded-[8px]">
								{post.photos?.[0] ? (
									<img
										className="w-[100px] h-[100px]"
										src={post.photos?.[0]}
										alt="되나?"
									/>
								) : (
									<Image
										className="w-full h-full shrink-0"
										src={fakelogo}
										alt="profile"
									/>
								)}
							</div>
						</div>
					</div>

					<div className="flex w-full justify-between items-center">
						{/* 닉네임,시간 컨테이너 */}
						<div className="flex items-center gap-[16px]">
							<div className="flex items-center gap-[8px]">
								{post.profile ? (
									<img
										src={post.profile}
										className="w-[14px] h-[14px] shrink-0"
										alt="사람 이미지"
									/>
								) : (
									<Image
										src={userIcon}
										alt="profile"
										className="w-[24px] h-[24px] shrink-0"
									/>
								)}
								<p className="text-[12px] leading-[18px] text-[#212121]">
									{post.nickname}
								</p>

								<time className="text-center text-[12px] font-medium leading-[18px] text-[#999999]">
									{post.createdAt &&
										new Date(post.createdAt).toLocaleString("ko-KR", {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
											hour12: false,
											timeZone: "Asia/Seoul",
										})}
								</time>
							</div>
						</div>

						<CuteHeart type="small" postId={post.id} />
					</div>
				</div>
			</div>
			<div className="flex justify-center w-full">
				<hr className="my-[32px] w-[680px]" />
			</div>
		</div>
	);
}
