"use client";
import React from "react";
import userIcon from "../../../assets/images/icon/profile.png";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { Post } from "@/app/assets/types/types";
import { useParams } from "next/navigation";
import Daetgle from "@/components/community/Daetgle";
import PostDeleteUpdateBtn from "@/components/community/PostDeleteUpdateBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import CuteHeart from "@/components/community/CuteHeart";

export default function CommunityDetail() {
  const { uid, photoURL, displayName, isLogin } = useSelector(
    (state: RootState) => state.login
  );
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
  const { id } = useParams();
  // console.log(pa);
  const foundPost = posts?.find((post) => {
    return post.id === id;
  });
  if (isLoading) return <>로딩중</>;
  return (
    <>
      {/* 커뮤니티 디테일 전체 컨테이너 */}
      <div className="flex flex-col items-center gap-[60px] self-stretch px-[620px] py-[60px] ">
        <div className="flex flex-col items-start gap-[24px] self-stretch">
          <div className="flex flex-col items-start gap-[12px] self-stretch">
            <div className="flex h-[24px] px-[8px] py-[4px] justify-center items-center gap-[4px] text-[#212121] bg-[#F1F1F1] rounded-[100px]">
              <h1>{foundPost?.category}</h1>
            </div>
            <div className="text-[20px] text-[#212121] font-semibold line-[28px]">
              <h2>{foundPost?.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-[8px] self-stretch text-[14px] text-[#999] font-medium line-[20px]">
            <time>
              {foundPost?.createdAt &&
                new Date(foundPost.createdAt).toLocaleString("ko-KR", {
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

          {/* 프로필 컨테이너 */}
          <div className="flex items-center gap-[12px] self-stretch">
            <div className="flex w-[40px] h-[40px] p-[8px] justify-center items-center rounded-[30px] bg-[#F1F1F1]">
              <Image
                className="w-[23px] h-[23px] shrink-0"
                src={userIcon}
                alt="profile"
              />
            </div>
            <p>{foundPost?.nickname}</p>
            {uid === foundPost?.uid && (
              <PostDeleteUpdateBtn foundPost={foundPost} />
            )}
          </div>
          <hr className="w-[700px]"></hr>

          <div className="flex flex-col items-start gap-[16px] self-stretch">
            {/* 내용 컨테이너 */}
            <div className="text-[14px] text-[#5C5C5C] font-medium line-[20px]">
              <p>{foundPost?.content}</p>
            </div>
            <div className="h-[320px] self-stretch rounded-[8px] bg-[#F1F1F1]">
              <p>사진</p>
            </div>
          </div>
        </div>

        {/* 공감해요,댓글  컨테이너 */}
        <div className="flex items-center gap-[16px]">
          <CuteHeart type="normal" postId={foundPost?.id} />
          <p>댓글 00</p>
        </div>

        <hr className="w-[700px]"></hr>

        {/* 댓글작성,버튼 컨테이너*/}
        <Daetgle />
      </div>
    </>
  );
}
