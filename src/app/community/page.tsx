"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import writeImage from "@/app/assets/images/icon/write_icon.png";
import userIcon from "../assets/images/icon/userIcon.png";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db, storage } from "@/shared/firebase";
import { Post } from "../assets/types/types";
import { nanoid } from "nanoid";
import Link from "next/link";
import CategoryBtn from "@/components/community/CategoryBtn";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref } from "firebase/storage";
import PostCard from "@/components/mypage/PostCard";
import BestPost from "@/components/community/BestPost";
import { getHearts } from "@/components/community/Fns";
import moeumLoading from "../assets/images/moeumLoading.gif";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListPage() {
  const { uid, displayName, isLogin, photoURL } = useSelector((state: RootState) => state.login);
  const handleWriteBtn = () => {
    if (!isLogin) {
      return toast.error("로그인을 해주세요", {
        transition: Slide,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      router.push("/community/write");
    }
  };
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    uid: "",
    title: "",
    content: "",
    profile: "",
    nickname: "",
    createdAt: 0,
    category: ""
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
        // setPostArray(data);
        return data;
      };

      return getPosts();
    }
  });
  const [postsArray, setPostArray] = useState<Post[] | undefined>();
  const { data: hearts } = useQuery({
    queryKey: [`hearts`],
    queryFn: getHearts
  });
  const filteredPosts = postsArray
    ?.filter((post) => {
      if (newPost.category === "" || newPost.category === "전체모음") {
        return true;
      }
      return newPost.category === post.category;
    })
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt - a.createdAt;
      }
      return 1;
    })
    .slice(0, 5);

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
  let BtnArray: number[] = [];
  if (posts?.length) {
    for (let i = 1; i <= Math.ceil(posts?.length / 5); i++) {
      BtnArray.push(i);
    }
    // console.log(BtnArray, "어레이");
  }
  const pagenationHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const BtnNumber = e.currentTarget.innerText;
    if (BtnNumber === "1") {
      let data2: Post[] = [];

      const postRef = collection(db, "posts");
      const postQuery = query(
        postRef,
        orderBy("createdAt", "desc"),

        limit(5)
      );
      const snapshot = await getDocs(postQuery);

      snapshot.forEach((doc) => {
        data2.push({ ...doc.data(), id: doc.id });
      });
      setPostArray(data2);
    } else {
      let data2: Post[] = [];
      const first = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(5 * (Number(BtnNumber) - 1)));
      const documentSnapshots = await getDocs(first);

      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const postRef = collection(db, "posts");
      const postQuery = query(postRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(5));
      const snapshot = await getDocs(postQuery);

      snapshot.forEach((doc) => {
        data2.push({ ...doc.data(), id: doc.id });
      });
      setPostArray(data2);
    }
  };
  useEffect(() => {
    setPostArray(posts);
  }, [posts]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Image width={300} height={300} src={moeumLoading} alt="loading" className="w-[300px] h-[300px]" />
      </div>
    );
  return (
    <>
      {/* 전체 컨테이너 */}
      <div className="flex  flex-col items-center  w-full gap-[20px] bg-[#fff]">
        {/* 글 모음/ 인기순위 컨텐츠 */}
        <div className="flex w-full py-[60px] flex-col justify-center items-center gap-[60px] bg-[#FAFAFA]">
          <div className="flex flex-col gap-[12px] items-center">
            <section>
              <h1 className="text-[28px] text-[#212121] font-semibold leading-[36px]">이 달의 BEST 게시글 모음</h1>
              <h2 className="text-[18px] text-[#5C5C5C] leading-[26px]">가장 인기 많았던 게시글을 확인해보세요!</h2>
            </section>
          </div>

          {/* 인기순위 컨테이너 */}
          <div className="flex justify-center items-center gap-[24px] cursor-pointer max-sm:overflow-x-scroll max-sm:w-[350px] max-sm:justify-start max-sm:scrollbar-hide max-md:overflow-x-scroll max-md:w-[350px] max-md:justify-start max-lg:overflow-x-scroll max-lg:w-[680px] max-lg:justify-start">
            {top3Shops?.map((post) => {
              return <React.Fragment key={nanoid()}>{post && <BestPost post={post} />}</React.Fragment>;
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-[60px] w-full pt-[60px] px-[20px] bg-[#fff]">
          <div>
            <div className="flex flex-col justify-center items-center gap-[40px]">
              <h2 className="text-[28px] text-[#212121] text-center font-semibold leading-[36px]">실시간모음</h2>
              <section className="grid max-sm:grid-cols-3 sm:grid-cols-5 gap-[16px] w-full">
                <CategoryBtn text="전체모음" type="" setNewPost={setNewPost} newPost={newPost} />
                <CategoryBtn text="일상이야기" type="" setNewPost={setNewPost} newPost={newPost} />
                <CategoryBtn text="맛집추천" type="" setNewPost={setNewPost} newPost={newPost} />
                <CategoryBtn text="취미생활" type="" setNewPost={setNewPost} newPost={newPost} />
                <CategoryBtn text="문의하기" type="" setNewPost={setNewPost} newPost={newPost} />
              </section>
            </div>
          </div>

          <div className="w-full flex justify-center" onClick={handleWriteBtn}>
            <div className="w-[680px] flex justify-end">
              <button className=" flex h-[40px] px-[12px] py-[8px] justify-center items-center gap-[8px] rounded-[8px]   text-[white] bg-[#FF8145] hover:bg-[#E5743E] ">
                <div className="w-[20px] h-[20px]">
                  <Image width={100} height={100} src={writeImage} alt="write"></Image>
                </div>
                <p className="text-[14px] leading-[20px] font-medium ">작성하기</p>
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-[40px]">
            {/* 작성하기 버튼 */}

            {/* 게시글 전체 컨테이너 */}
            <div className="flex flex-col justify-center items-center w-[680px] max-sm:w-[350px]">
              <div className="w-full">
                {filteredPosts?.map((post) => {
                  return (
                    <React.Fragment key={nanoid()}>
                      <div className="flex justify-center items-center">
                        <PostCard post={post} />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <section className="flex gap-4">
          {BtnArray.map((item) => {
            return (
              <button
                key={nanoid()}
                className="mb-[60px] flex h-[30px] w-[30px] justify-center items-center rounded-full text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                onClick={(e) => pagenationHandler(e)}
              >
                {item}
              </button>
            );
          })}
        </section>
      </div>
    </>
  );
}
