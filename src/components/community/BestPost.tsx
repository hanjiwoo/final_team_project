"use client";
import { Post } from "@/app/assets/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import CuteHeart from "./CuteHeart";

export default function BestPost({ post }: { post: Post }) {
  const router = useRouter();
  const moveToDetail = () => {
    router.push(`/community/detail/${post.id}`);
  };

  return (
    <div
      onClick={moveToDetail}
      className="flex flex-col items-start gap-[20px]"
    >
      <div className="flex flex-col items-start gap-[8px] self-stretch hover:bg-[#f1f1f1]">
        <div className="w-[344px] h-[252px] bg-gray-100 rounded-[12px] border-2">
          <img
            src={post.photos?.[0]}
            alt="포스트 사진"
            className="w-full h-full rounded-[12px] "
          />
        </div>
        <p className="flex h-[24px] py-[4px] px-[8px] justify-center items-center gap-[4px] rounded-[100px] text-[#212121] bg-gray-100">
          {post.category}
        </p>
        <p className="text-[16px] font-semibold leading-[24px] ">
          {post.title}
        </p>
        <CuteHeart type="small" postId={post.id} />
      </div>
    </div>
  );
}
