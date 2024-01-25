"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import writeImage from "@/app/assets/images/icon/write_icon.png";
import userIcon from "../assets/images/icon/userIcon.png";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "@/shared/firebase";
import { Post } from "../assets/types/types";
import { nanoid } from "nanoid";
import Link from "next/link";
import CategoryBtn from "@/components/community/CategoryBtn";
import { useRouter } from "next/navigation";
import CuteHeart from "@/components/community/CuteHeart";
import { getDownloadURL, ref } from "firebase/storage";
import PostCard from "@/components/mypage/PostCard";
import BestPost from "@/components/community/BestPost";
import { getHearts } from "@/components/community/Fns";

export default function ListPage() {
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    uid: "",
    title: "",
    content: "",
    profile: "",
    nickname: "",
    createdAt: 0,
    category: "",
  });
  const [top3Shops, setTop3Shops] = useState<(Post | undefined)[]>();
  const router = useRouter();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      const getPosts = async () => {
        let data: Post[] = [];
        const response = await getDocs(collection(db, "posts"));
        response.forEach((post) => {
          const postData = post.data();
          data.push({ ...postData, id: post.id });
        });

        return data;
      };

      return getPosts();
    },
  });
  const { data: hearts } = useQuery({
    queryKey: [`hearts`],
    queryFn: getHearts,
  });
  const filteredPosts = posts?.filter((post) => {
    if (newPost.category === "" || newPost.category === "전체모음") {
      return true;
    }
    return newPost.category === post.category;
  });

  useEffect(() => {
    const uniqueArray = hearts?.map((item) => {
      return item.postId;
    });
    // console.log(uniqueArray, "요거는?");
    const countThumbs: Record<string, number> = {};
    uniqueArray?.forEach((element) => {
      const key = String(element);
      countThumbs[key] = (countThumbs[key] || 0) + 1;
    });
    const entries = Object.entries(countThumbs);
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
    const top3 = sortedEntries.slice(0, 3);
    // console.log(top3, "탑3");
    const foundTop3 = top3.map((postId) => {
      return posts?.find((post) => {
        return post.id === postId[0];
      });
    });
    // console.log(foundTop3, "과연");
    if (foundTop3 !== undefined) {
      setTop3Shops(foundTop3);
    }
  }, [hearts]);

  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      {/* 전체 컨테이너 */}
      <div className="flex  flex-col items-center  w-full h-full gap-[20px] my-[60px]">
        {/* 글 모음/ 인기순위 컨텐츠 */}
        <div className="flex  py-[60px] flex-col justify-center items-center gap-[60px] self-stretch">
          <div className="flex flex-col gap-[12px] items-center">
            <section>
              <h1 className="text-[28px] text-[#212121] font-semibold leading-[36px]">
                이 달의 BEST 게시글 모-음
              </h1>
              <h2 className="text-[18px] text-[#5C5C5C] leading-[26px]">
                가장 인기 많았던 게시글을 확인해보세요!
              </h2>
            </section>
          </div>

          {/* 인기순위 컨테이너 */}
          <div className="flex justify-center items-center gap-[24px] self-stretch">
            {top3Shops?.map((post) => {
              return (
                <React.Fragment key={nanoid()}>
                  {post && <BestPost post={post} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-[60px] w-full self-stretch">
          <div className="w-[680px]">
            <div className="flex flex-col justify-center items-center gap-[40px]">
              <h2 className="text-[28px] text-[#212121] text-center font-semibold leading-[36px]">
                실시간모음
              </h2>

              <div className="flex h-[40px] px-[12px] py-[8px] justify-center items-center gap-[4px]">
                <section className="flex gap-[16px]">
                  <CategoryBtn
                    text="전체모음"
                    type=""
                    setNewPost={setNewPost}
                    newPost={newPost}
                  />
                  <CategoryBtn
                    text="일상이야기"
                    type=""
                    setNewPost={setNewPost}
                    newPost={newPost}
                  />
                  <CategoryBtn
                    text="맛집추천"
                    type=""
                    setNewPost={setNewPost}
                    newPost={newPost}
                  />
                  <CategoryBtn
                    text="취미생활"
                    type=""
                    setNewPost={setNewPost}
                    newPost={newPost}
                  />
                  <CategoryBtn
                    text="문의하기"
                    type=""
                    setNewPost={setNewPost}
                    newPost={newPost}
                  />
                </section>
              </div>
            </div>
          </div>

          {/* 작성하기 버튼 */}
          <div className="flex w-full justify-center items-center">
            <div className="flex w-[680px] flex-col items-end gap-[40px] self-stretch">
              <div className="w-full flex justify-end ">
                <Link href="community/write">
                  <button className=" flex h-[40px] px-[12px] py-[8px] justify-center items-center gap-[8px] rounded-[8px]   text-[white] bg-[#FF8145]">
                    <div className="w-[20px] h-[20px]">
                      <Image src={writeImage} alt="write"></Image>
                    </div>
                    <p className="text-[14px] leading-[20px] font-medium">
                      작성하기
                    </p>
                  </button>
                </Link>
              </div>

              {/* 게시글 전체 컨테이너 */}
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                {filteredPosts?.map((post) => {
                  return (
                    <React.Fragment key={nanoid()}>
                      <PostCard post={post} />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
