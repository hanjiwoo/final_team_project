"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import postIcon from "../../app/assets/images/icon/pencilIcon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useRouter } from "next/navigation";
import { getHearts } from "../community/Fns";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../community/queryFn";
import { nanoid } from "nanoid";
import PostCard from "./PostCard";
import { toast } from "react-toastify";
import right from "../../app/assets/images/icon/myRight.png";

export default function PostDataOff() {
  const user = useSelector((state: RootState) => state.login);
  const { displayName, email, uid, photoURL } = user;
  const router = useRouter();
  // const { data: hearts, isLoading } = useQuery({
  //   queryKey: [`hearts`],
  //   queryFn: getHearts,
  // });
  const { data: posts } = useQuery({
    queryKey: [`posts`],
    queryFn: getPosts
  });
  const myPosts = posts?.filter((post) => {
    return post.uid === uid;
  });

  useEffect(() => {
    if (!user.isLogin) {
      toast.warning("로그인시 이용가능합니다.");
      router.push("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full my-[60px] px-[20px] max-sm:my-[32px] max-lg:my-[60px]">
      <div className="w-[880px]">
        <div className="flex flex-row gap-[5px] mb-[40px] max-sm:mb-[32px]">
          <span
            className="text-[14px] leading-[20px] text-[#C2C2C2] cursor-pointer"
            onClick={() => {
              router.push("/mypage");
            }}
          >
            마이 모음
          </span>
          <Image src={right} alt="right" className="w-[18px] h-[18px]" />
          <span className="text-[14px] leading-[20px] text-[#7A7A7A]">게시물 모음</span>
        </div>
        <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px] ">게시물 모음</h1>
        {!myPosts && (
          <section className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
            <Image src={postIcon} alt="mainIcon" className="w-[48px] h-[48px]" />
            <span className="text-center text-neutral-400 text-base font-medium leading-normal">
              작성한 게시글이 따로 없습니다
              <br />
              게시글을 작성해주세요 :)
            </span>
          </section>
        )}
        <section className="flex flex-col gap-1">
          {myPosts?.map((post) => {
            if (post) {
              return (
                <React.Fragment key={nanoid()}>
                  <PostCard post={post} />{" "}
                </React.Fragment>
              );
            }
          })}
        </section>
      </div>
    </div>
  );
}
