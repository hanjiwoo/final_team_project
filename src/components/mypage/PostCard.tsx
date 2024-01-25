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
    <>
      <div className="cursor-pointer" onClick={() => moveToDetail(post.id)}>
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
              <div className="text-[14px] font-medium leading-[20px] text-[#5C5C5C]  overflow-ellipsis w-32 line-clamp-3">
                <p>{post.content}</p>
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

        <div className="flex w-[680px] justify-between items-center self-stretch">
          {/* 닉네임,시간 컨테이너 */}
          <div className="flex w-[475px] items-center gap-[16px]">
            <div className="flex items-center gap-[8px] w-[24px] h-[24px] ">
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
                  className="w-full h-full shrink-0"
                />
              )}
            </div>

            <p>{post.nickname}</p>

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

          <CuteHeart type="small" postId={post.id} />
        </div>
      </div>
    </>
  );
}
