"use client";
import React, { useState } from "react";
import Image from "next/image";
import writeImage from "@/app/assets/images/icon/write_icon.png";
import userIcon from "../assets/images/icon/userIcon.png";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { Post } from "../assets/types/types";
import { nanoid } from "nanoid";
import Link from "next/link";
import CategoryBtn from "@/components/community/CategoryBtn";
import { useRouter } from "next/navigation";
import CuteHeart from "@/components/community/CuteHeart";

export default function ListPage() {
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    uid: "",
    title: "",
    content: "",
    profile: userIcon,
    nickname: "",
    createdAt: 0,
    category: "",
  });
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

  const filteredPosts = posts?.filter((post) => {
    if (newPost.category === "" || newPost.category === "전체모음") {
      return true;
    }
    return newPost.category === post.category;
  });

  const moveToDetail = (id: string) => {
    router.push(`/community/detail/${id}`);
  };
  if (isLoading) return <div>로딩중</div>;
  return (
    <>
      {/* 전체 컨테이너 */}
      <div className="flex  flex-col items-center  w-full h-full gap-[20px] my-[60px]">
        {/* 글 모음/ 인기순위 컨텐츠 */}
        <div className="flex px-[420px] py-[60px] flex-col justify-center items-center gap-[60px] self-stretch">
          <h2 className="text-[28px] text-[#212121] font-semibold leading-[36px]">
            이 달의 BEST 게시글 모-음
          </h2>
          <p className="text-[18px] text-[#5C5C5C]font-medium leading-[26px]">
            가장 인기 많았던 게시글을 확인해보세요!
          </p>

          {/* 인기순위 컨테이너 */}
          <div className="flex justify-center gap-[24px] self-stretch">
            <div className="flex flex-col items-start gap-[20px]">
              <div className="flex flex-col items-start gap-[8px] self-stretch">
                <div className="w-[344px] h-[252px] bg-gray-100 rounded-[12px]">
                  사진
                </div>
                <p className="flex h-[24px] py-[4px] px-[8px] justify-center items-center gap-[4px] rounded-[100px] text-[#212121] bg-gray-100">
                  카테고리
                </p>
                <p className="text-[16px] font-semibold leading-[24px] ">
                  게시글 제목
                </p>
                <p className="w-[20px] h-[20px] text-[#FF8145]">♥</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-[20px]">
              <div className="flex flex-col items-start gap-[8px] self-stretch">
                <div className="w-[344px] h-[252px] bg-gray-100 rounded-[12px]">
                  사진
                </div>
                <p className="flex h-[24px] py-[4px] px-[8px] justify-center items-center gap-[4px] rounded-[100px] text-[#212121] bg-gray-100">
                  카테고리
                </p>
                <p className="text-[16px] font-semibold leading-[24px] ">
                  게시글 제목
                </p>
                <p className="w-[20px] h-[20px] text-[#FF8145]">♥</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-[20px]">
              <div className="flex flex-col items-start gap-[8px] self-stretch">
                <div className="w-[344px] h-[252px] bg-gray-100 rounded-[12px]">
                  사진
                </div>
                <p className="flex h-[24px] py-[4px] px-[8px] justify-center items-center gap-[4px] rounded-[100px] text-[#212121] bg-gray-100">
                  카테고리
                </p>
                <p className="text-[16px] font-semibold leading-[24px] ">
                  게시글 제목
                </p>
                <p className="w-[20px] h-[20px] text-[#FF8145]">♥</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-[60px] self-stretch px-[620px] py-[60px]">
          <div className="flex flex-col justify-center items-center gap-[40px]">
            <h2 className="text-[28px] text-[#212121] text-center font-semibold leading-[36px]">
              실시간모음
            </h2>
            <div className="flex justify-center items-center gap-[16px]">
              <section className="flex h-[40px] px-[12px] py-[8px] justify-center items-center gap-[4px] ">
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

          {/* 작성하기 버튼 */}
          <div className="flex flex-col w-full gap-[40px] self-stretch">
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
            {filteredPosts?.map((post) => {
              return (
                <div key={nanoid()}>
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
                        <p>사진</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-[474.5px] items-center gap-[16px]">
                    {/* 닉네임,시간 컨테이너 */}
                    <div className="flex items-center gap-[8px]">
                      <Image
                        src={userIcon}
                        alt="profile"
                        className="w-[14px] h-[14px] shrink-0"
                        width={100}
                        height={100}
                      />
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
                    <button
                      onClick={() => moveToDetail(post.id)}
                      className="bg-green-300"
                    >
                      상세페이지로
                    </button>
                    <CuteHeart type="small" postId={post.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
