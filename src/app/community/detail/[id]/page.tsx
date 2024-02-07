"use client";
import React from "react";
import userIcon from "../../../../../public/Favicon_32_32.png";
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
import { nanoid } from "nanoid";
import moeumLoading from "../../../assets/images/moeumLoading.gif";

export default function CommunityDetail() {
  const { uid, photoURL, displayName, isLogin } = useSelector((state: RootState) => state.login);
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
    }
  });
  const { id } = useParams();
  // console.log(pa);
  const foundPost = posts?.find((post) => {
    return post.id === id;
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Image width={300} height={300} src={moeumLoading} alt="loading" className="w-[300px] h-[300px]" />
      </div>
    );
  return (
    <>
      {/* 커뮤니티 디테일 전체 컨테이너 */}
      <div className="flex flex-col w-full items-center gap-[60px]  my-[60px] px-[20px]">
        <div className="flex flex-col gap-[12px]  justify-center w-[680px] max-md:w-full">
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[12px] w-full justify-center">
              <p className="text-[#212121] leading-[14px] py-[4px] px-[8px] bg-[#F1F1F1] rounded-[100px] text-[10px] flex justify-center items-center w-[60px]">
                {foundPost?.category}
              </p>
              <h1 className="text-[20px] leading-[28px] font-semibold text-[#212121]">{foundPost?.title}</h1>
            </div>
            <div className="flex items-center text-[14px] text-[#999] leading-[20px]">
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
                    timeZone: "Asia/Seoul"
                  })}
              </time>
            </div>
          </div>

          {/* 프로필 컨테이너 */}
          <div className="flex justify-between items-center w-full h-[40px] mt-[20px]">
            <div className="flex items-center gap-[12px] ">
              <div className="flex w-[40px] h-[40px]  justify-center items-center rounded-[30px]">
                {foundPost?.profile ? (
                  <img src={foundPost?.profile} className="w-full h-full rounded-full" alt="사람 이미지" />
                ) : (
                  <Image width={100} height={100} className="w-full h-full shrink-0" src={userIcon} alt="profile" />
                )}
              </div>

              <p>{foundPost?.nickname}</p>
            </div>
            <div>{uid === foundPost?.uid && <PostDeleteUpdateBtn foundPost={foundPost} />}</div>
          </div>
          <hr className="w-full my-[24px]"></hr>

          <div className="flex flex-col w-full gap-[16px]">
            {/* 내용 컨테이너 */}
            <div className="text-[14px] text-[#5C5C5C] font-medium leading-[20px]  ">
              <p>{foundPost?.content}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-[10px] w-full rounded-[8px] my-[24px] ">
              {foundPost?.photos?.map((photo) => {
                return (
                  <div key={nanoid()} className="h-[320px] flex justify-center items-center mt-[16px]">
                    <Image
                      width={300}
                      height={300}
                      className=" h-[320px] object-cover bg-contain"
                      src={photo}
                      alt="포스트사진"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 공감해요,댓글  컨테이너 */}
          {/* <div className="flex items-center gap-[16px]">
              <div className="flex items-center gap-[6px]">
                <CuteHeart type="normal" postId={foundPost?.id} />
                <div className="text-center text-[14px] font-medium leading-[20px]">
                  <p>공감해요</p>
                </div>
                <div className="text-[14px] font-medium leading-[20px]">
                  <p>00</p>
                </div>
              </div>

              <div className="flex items-center gap-[6px]">
                <div className="text-[14px] text-[#999] font-medium leading-[20px] text-center">
                  <p>댓글</p>
                </div>
                <div className="text-[14px] text-[#999] font-medium leading-[20px] text-center">
                  <p>00</p>
                </div>
              </div> */}

          {/* <hr className="w-full my-[32px]"></hr> */}

          {/* 댓글작성,버튼 컨테이너*/}
          {foundPost && <Daetgle post={foundPost} />}
        </div>
      </div>
    </>
  );
}
