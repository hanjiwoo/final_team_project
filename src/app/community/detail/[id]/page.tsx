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
import { nanoid } from "nanoid";

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
      <div className="flex flex-col items-center w-[100%] h-[100%]">
        <div className="flex flex-col gap-[20px]">
          <div className=" mr-[29%]">
            <h1 className="border-2 w-[100px] text-center rounded-[10px] bg-[#FF8145] text-white border-[#FF8145]">
              {foundPost?.category}
            </h1>
            <h2 className="text-[30px] font-bold">{foundPost?.title}</h2>
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
          <div className="flex gap-[10px] mr-[36%]">
            {foundPost?.profile && (
              <Image
                className="w-[28px] h-[28px]"
                src={userIcon}
                alt="profile"
                width={100}
                height={100}
              />
            )}

            <p>{foundPost?.nickname}</p>
            {uid === foundPost?.uid && (
              <PostDeleteUpdateBtn foundPost={foundPost} />
            )}
          </div>
          <hr className="w-[700px]"></hr>

          {/* 내용 컨테이너 */}
          <div className="flex flex-col gap-[20px]">
            <p>{foundPost?.content}</p>
            {/*이미지 컨테이너 */}
            <p className=" border-2 w-[600px] h-[300px] flex">
              {foundPost?.photos?.map((photo) => {
                return (
                  <img key={nanoid()} width={200} height={200} src={photo} />
                );
              })}
            </p>
          </div>

          {/* 공감해요 컨테이너 */}
          <div className="flex gap-[20px]">
            <CuteHeart type="normal" postId={foundPost?.id} />
            <p>댓글 00</p>
          </div>

          <hr className="w-[700px]"></hr>

          {/* 댓글작성,버튼 컨테이너*/}
          <Daetgle />
        </div>
      </div>
    </>
  );
}
