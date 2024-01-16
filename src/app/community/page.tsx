"use client";
import React from "react";
import Image from "next/image";
import writeImage from "@/app/assets/images/icon/write_icon.png";
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
      {/* 전체 컨테이너 */}
      <div className="flex  flex-col items-center jusfift-center w-[100%] h-[100%] gap-[20px]">
        <div>
          <h2 className="text-[30px] font-bold">이 달의 BEST 게시글 모-음</h2>
          <p className="text-gray-600">
            가장 인기 많았던 게시글을 확인해보세요!
          </p>
        </div>

        {/* 인기순위 컨테이너 */}
        <div className="flex gap-[20px]">
          <div>
            <div className="border-2 w-[200px] h-[150px]">인기1위</div>
            <p>게시글 제목</p>
            <p>♥</p>
          </div>

          <div>
            <div className="border-2 w-[200px] h-[150px]">인기2위</div>
            <p>게시글 제목</p>
            <p>♥</p>
          </div>

          <div>
            <div className="border-2 w-[200px] h-[150px]">인기3위</div>
            <p>게시글 제목</p>
            <p>♥</p>
          </div>
        </div>

        {/* 작성하기 버튼 */}
        <div className="flex justify-end w-[50%]">
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
        {posts?.map((post) => {
          return (
            <div className=" border-2 flex w-[50%] h-[170px] ">
              <div
                className=" w-[100%] h-full flex flex-col justify-between "
                key={nanoid()}
              >
                <div className="text-[20px]  font-bold">
                  <h2>제목:{post.title}</h2>
                </div>

                <div>
                  <p>내용:{post.content}</p>
                </div>

                <div className="flex gap-[10px]">
                  <Image
                    src={userIcon}
                    alt="profile"
                    className="w-[28px] h-[28px]"
                  />
                  <p>이아름 바보{post.nickname}</p>
                  <time>2024-01-16</time>
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
