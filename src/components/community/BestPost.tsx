"use client";
import { Post } from "@/app/assets/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import CuteHeart from "./CuteHeart";
import Image from "next/image";
import mockImage from "../../app/assets/images/mockImage.jpg";

export default function BestPost({ post }: { post: Post }) {
  const router = useRouter();
  const moveToDetail = () => {
    router.push(`/community/detail/${post.id}`);
  };

  return (
    <div onClick={moveToDetail} className="w-full">
      <div className="flex flex-col gap-[8px]">
        <div className="w-[344px] h-[252px] object-cover bg-cover flex justify-center items-center">
          {post.photos?.[0] ? (
            <Image
              src={post.photos?.[0]}
              width={300}
              height={300}
              alt="bestImage"
              className="w-full h-full object-cover bg-cover rounded-[12px]"
            />
          ) : (
            <Image
              width={100}
              height={100}
              className="w-full h-full object-cover bg-cover rounded-[12px]"
              src={mockImage}
              alt="profile"
            />
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#212121] leading-[14px] py-[4px] px-[8px] bg-[#F1F1F1] rounded-[100px] text-[10px] flex justify-center items-center w-[60px]">
            {post.category}
          </p>

          <p className="text-[16px] font-semibold leading-[24px] text-[#212121]">{post.title}</p>
          <CuteHeart type="small" postId={post.id} />
        </div>
      </div>
    </div>
  );
}
