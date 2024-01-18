"use client";
import React, { useState } from "react";
import Image from "next/image";
import writeImage from "@/app/assets/images/icon/write_icon.png";
import userIcon from "../assets/images/icon/userIcon.png";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { Post } from "../assets/types/types";
import { nanoid } from "nanoid";
import Link from "next/link";
import CategoryBtn from "@/components/community/CategoryBtn";
import { useRouter } from "next/navigation";
import CuteHeart from "@/components/community/CuteHeart";

export default function Listpage() {
	const [newPost, setNewPost] = useState<Post>({
		id: "",
		uid: "",
		title: "",
		content: "",
		profile: userIcon,
		nickname: "",
		createdAt: 0,
		category: "",
	});
	const router = useRouter();
	const { data: posts, isLoading } = useQuery({
		queryKey: ["posts"],
		queryFn: () => {
			const getPosts = async () => {
				let data: Post[] = [];
				const response = await getDocs(collection(db, "posts"));
				response.forEach((post) => {
					const postData = post.data();
					data.push({ ...postData, id: post.id });
				});

				return data;
			};

			return getPosts();
		},
	});
	// const formattedDate = new Date(posts.createdAt).toLocaleDateString("ko", {
	//   year: "2-digit",
	//   month: "2-digit",
	//   day: "2-digit",
	//   hour: "2-digit",
	//   minute: "2-digit",
	//   second: "2-digit",
	// });
	const filteredPosts = posts?.filter((post) => {
		if (newPost.category === "" || newPost.category === "전체모음") {
			return true;
		}
		return newPost.category === post.category;
	});

	const moveToDetail = (id: string) => {
		router.push(`/community/detail/${id}`);
	};
	if (isLoading) return <div>로딩중</div>;
	return (
		<>
			{/* 전체 컨테이너 */}
			<div className="flex  flex-col items-center  w-[100%] h-[100%] gap-[20px]">
				<div>
					<h2 className="text-[30px] font-bold">이 달의 BEST 게시글 모-음</h2>
					<p className="text-gray-600">
						가장 인기 많았던 게시글을 확인해보세요!
					</p>
				</div>

				{/* 인기순위 컨테이너 */}
				<div className="flex gap-[20px]">
					<Link className="hover:bg-[#E5743E]" href={"community/detail"}>
						<div>
							<div className="border-2 w-[200px] h-[150px]">인기1위</div>
							<p>게시글 제목</p>
							<p>♥</p>
						</div>
					</Link>

					<Link className="hover:bg-[#E5743E]" href={"community/detail"}>
						<div>
							<div className="border-2 w-[200px] h-[150px]">인기2위</div>
							<p>게시글 제목</p>
							<p>♥</p>
						</div>
					</Link>

					<Link className="hover:bg-[#E5743E]" href={"community/detail"}>
						<div>
							<div className="border-2 w-[200px] h-[150px]">인기3위</div>
							<p>게시글 제목</p>
							<p>♥</p>
						</div>
					</Link>
				</div>
				<h2>실시간모음</h2>
				<section className="flex items-center gap-10">
					<CategoryBtn
						text="전체모음"
						type=""
						setNewPost={setNewPost}
						newPost={newPost}
					/>
					<CategoryBtn
						text="일상이야기"
						type=""
						setNewPost={setNewPost}
						newPost={newPost}
					/>
					<CategoryBtn
						text="맛집추천"
						type=""
						setNewPost={setNewPost}
						newPost={newPost}
					/>
					<CategoryBtn
						text="취미생활"
						type=""
						setNewPost={setNewPost}
						newPost={newPost}
					/>
					<CategoryBtn
						text="문의하기"
						type=""
						setNewPost={setNewPost}
						newPost={newPost}
					/>
				</section>
				{/* 작성하기 버튼 */}
				<div className="flex justify-end w-[50%] bg-yellow-100">
					<Link href="community/write">
						<button className=" flex justify-center items-center gap-[10px] rounded-[10px] w-[130px] h-[40px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]">
							<div className="w-[20px] h-[20px]">
								<Image src={writeImage} alt="write"></Image>
							</div>
							<p>작성하기</p>
						</button>
					</Link>
				</div>

				{/* 게시글 전체 컨테이너 */}
				{filteredPosts?.map((post) => {
					return (
						<div key={nanoid()} className=" border-2 flex w-[50%] h-[170px] ">
							<div className=" w-[100%] h-full flex flex-col justify-between ">
								{/* 제목 컨테이너 */}
								<div className="text-[20px] border-2 border-black rounded-full font-bold w-1/5">
									<h2>{post.category}</h2>
								</div>
								{/* 제목 컨테이너 */}
								<div className="text-[20px]  font-bold">
									<h2>제목:{post.title}</h2>
								</div>

								{/* 내용 컨테이너 */}
								<div>
									<p>내용:{post.content}</p>
								</div>

								{/* 닉네임,시간 컨테이너 */}
								<div className="flex gap-[10px]">
									<Image
										src={userIcon}
										alt="profile"
										className="w-[28px] h-[28px]"
										width={100}
										height={100}
									/>
									<p>{post.nickname}</p>
									<time>
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
									<button
										onClick={() => moveToDetail(post.id)}
										className="bg-green-300"
									>
										상세페이지로
									</button>
									<CuteHeart type="small" postId={post.id} />
								</div>
							</div>

							{/* 사진컨테이너 */}
							<div className=" ">
								<p className="border-2 w-[150px] h-[150px]">사진</p>
								<p>♥</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* img src={null ?? defaultUser} alt="프로필이미지" */}
		</>
	);
}
