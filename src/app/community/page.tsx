"use client";
import React from "react";
import Image from "next/image";
import userIcon from "../assets/images/icon/userIcon.png";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { Post } from "../assets/types/types";
import { nanoid } from "nanoid";
import Link from "next/link";

export default function listpage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      const getPosts = async () => {
        let data: Post[] = [];
        const response = await getDocs(collection(db, "posts"));
        // console.log(response, "하하");
        response.forEach((post) => {
          const postData = post.data();
          // console.log(postData, "하하");
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

  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-[30px] font-bold">이 달의 BEST 게시글 모-음</h2>
        <p>가장 인기 많았던 게시글을 확인해보세요!</p>
      </div>

      <div>
        <Link href="community/write">
          <button className=" rounded-[10px] w-[130px] h-[40px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]">
            작성하기
          </button>
        </Link>
      </div>

      {posts?.map((post) => {
        return (
          <div className="border-2 ">
            <div key={nanoid()}>
              <p>제목입니다. : {post.title}</p>
              <p> 내용입니다. : {post.content}</p>
              <p>닉네임입니다{post.nickname}</p>
              <time>날짜입니다.</time>
              <p>사진입니다(우측으로갈것)</p>
              <Image
                src={userIcon}
                alt="profile"
                className="w-[28px] h-[28px]"
              />
            </div>
          </div>
        );
      })}

      {/* img src={null ?? defaultUser} alt="프로필이미지" */}
    </>
  );
}
