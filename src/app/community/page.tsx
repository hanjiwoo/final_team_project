"use client";
import React from "react";
import Image from "next/image";
import userIcon from "../assets/images/icon/userIcon.png";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { Post } from "../assets/types/types";
import { nanoid } from "nanoid";
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

  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      <div>
        <p>추천해요 목록 입니다.</p>
      </div>
      {posts?.map((post) => {
        return (
          <div key={nanoid()}>
            타이틀 : {post.title} 콘텐츠 : {post.content}
          </div>
        );
      })}
      <div>
        <h1>제목입니다</h1>
        <p>내용입니다.</p>
        {/* img src={null ?? defaultUser} alt="프로필이미지" */}
        <Image src={userIcon} alt="profile" className="w-[28px] h-[28px]" />
        <p>닉네임입니다.</p>
        <p>날짜입니다.</p>
        <p>사진입니다(우측으로갈것)</p>
      </div>

      <button className="border-2 border-black">작성하기</button>
    </>
  );
}
