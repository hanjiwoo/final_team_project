"use client";
import Image from "next/image";
import React from "react";
import userIcon from "../../app/assets/images/icon/userIcon.png";
import CuteHeart from "../community/CuteHeart";
import { useRouter } from "next/navigation";
import { Post } from "@/app/assets/types/types";
export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const moveToDetail = (id: string) => {
    router.push(`/community/detail/${id}`);
  };
  return (
    <div>
      <div className="flex h-[132px] flex-col items-start gap-[8px] self-stretch">
        {/* 카테고리 */}
        <div className=" flex h-[24px] px-[8px] py-[4px] justify-center items-center gap-[4px] shrink-0 rounded-[100px] bg-[#F1F1F1] text-[#212121]">
          <h2>{post.category}</h2>
        </div>

        <div className="flex h-[100px] justify-between items-center shrink-0 self-stretch">
          {/* 제목 컨테이너 */}

          <div className="flex flex-col items-start gap-[12px]">
            <div className="text-[16px] text-center font-semibold leading-[24px] text-[#212121]">
              <p>{post.title}</p>
            </div>

            {/* 내용 컨테이너 */}
            <div className="text-[14px] font-medium leading-[20px] text-[#5C5C5C]">
              <p>{post.content}</p>
            </div>
          </div>

          {/* 사진컨테이너 */}
          <div className="w-[100px] h-[100px] bg-[#F1F1F1] rounded-[8px]">
            <img src={post.photos?.[0]} alt="되나?" />
          </div>
        </div>
      </div>

      <div className="flex w-[474.5px] items-center gap-[16px]">
        {/* 닉네임,시간 컨테이너 */}
        <div className="flex items-center gap-[8px]">
          {/* {post.profile ? (
          <Image
            src={post.profile}
            alt="profile"
            className="w-[14px] h-[14px] shrink-0"
            width={100}
            height={100}
          />
        ) : ( */}
          <Image
            src={userIcon}
            alt="profile"
            className="w-[14px] h-[14px] shrink-0"
            width={100}
            height={100}
          />
          {/* )} */}
          <p>{post.nickname}</p>
        </div>
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
        <button onClick={() => moveToDetail(post.id)} className="bg-green-300">
          상세페이지로
        </button>
        <CuteHeart type="small" postId={post.id} />
      </div>
    </div>
  );
}
