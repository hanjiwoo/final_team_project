"use client";
import Image from "next/image";
import React from "react";
import userIcon from "../../../public/Favicon_32_32.png";
import mockImage from "../../app/assets/images/mockImage.jpg";
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
    <div className="flex justify-center items-center flex-col w-full">
      <div
        className="cursor-pointer w-full rounded-[8px] flex flex-col justify-center gap-[8px]"
        onClick={() => moveToDetail(post.id)}
      >
        {/* 카테고리 */}

        <p className="text-[#212121] leading-[14px] py-[4px] px-[8px] bg-[#F1F1F1] rounded-[100px] text-[10px] flex justify-center items-center w-[60px]">
          {post.category}
        </p>
        <div className="flex flex-col gap-[16px] max-sm:gap-[12px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between items-center w-full mt-[8px] gap-[16px]">
              {/* 제목 컨테이너 */}

              <div className="flex flex-col gap-[12px] max-sm:gap-[8px]">
                <div className="text-[16px] font-semibold leading-[24px] text-[#212121] max-sm:text-[14px] max-sm:leading-[20px]">
                  {post.title}
                </div>
                {/* 내용 컨테이너 */}
                <div className="text-[14px] font-medium leading-[20px] text-[#5C5C5C] overflow-ellipsis w-[336px] line-clamp-2 max-sm:text-[12px] max-sm:leading-[18px] max-sm:overflow-ellipsis max-sm:w-[254px]">
                  {post.content}
                </div>
              </div>

              {/* 사진컨테이너 */}
              <div className="w-[100px] h-[100px] bg-[#F1F1F1] rounded-[8px] max-sm:w-[80px] max-sm:h-[80px]">
                {post.photos?.[0] ? (
                  <Image
                    width={100}
                    height={100}
                    className="w-full h-full object-cover bg-cover max-sm:w-[80px] max-sm:h-[80px] rounded-[8px]"
                    src={post.photos?.[0]}
                    alt="되나?"
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    className="w-full h-full rounded-[8px]"
                    src={mockImage}
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
                  <img src={post.profile} className="w-[14px] h-[14px] " alt="사람 이미지" />
                ) : (
                  <Image src={userIcon} alt="profile" className="w-[24px] h-[24px] " />
                )}
                <p className="text-[12px] leading-[18px] text-[#212121]">{post.nickname}</p>

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
                      timeZone: "Asia/Seoul"
                    })}
                </time>
              </div>
            </div>
            <CuteHeart type="small" postId={post.id} />
          </div>
        </div>
      </div>

      <hr className="my-[32px] w-full" />
    </div>
  );
}
