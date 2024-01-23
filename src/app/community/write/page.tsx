"use client";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState, ChangeEvent } from "react";
import { db } from "@/shared/firebase";
import { Post } from "@/app/assets/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CategoryBtn from "@/components/community/CategoryBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";

export default function WritePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const route = useRouter();
  const { uid, displayName, isLogin, photoURL } = useSelector(
    (state: RootState) => state.login
  );
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    uid,
    title: "",
    content: "",
    profile: photoURL,
    nickname: displayName,
    createdAt: Date.now(),
    category: "",
  });

  const addPost = async () => {
    await addDoc(collection(db, "posts"), newPost);
  };

  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addPost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setNewPost({ ...newPost, [name]: value });
    // console.log(newPost);
  };

  const handleAddPost = async () => {
    if (!isLogin) return alert("로그인하셔야 게시글을 남기실수 있습니다.");
    if (!newPost.content || !newPost.title || !newPost.category)
      return alert("카테고리 타이틀 컨텐츠를 작성해 주세요");
    const confirmResult = window.confirm("게시글 작성을 하시겠습니까?");
    if (confirmResult) {
      alert("작성이 완료되었습니다.");
      route.push("/community");
      mutateToAdd();
    }
  };

  const handleCancel = () => {
    const confirmResult = window.confirm("작성을 취소하시겠습니까?");
    if (confirmResult) {
      // 작성을 취소할 때 수행할 동작 추가
      // 예: 취소 후 어떤 페이지로 이동하는 등의 작업
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        {/* 전체 컨테이너 */}

        <div className="flex px-[420px] py-[60px] flex-col items-start gap-[60px] self-stretch">
          {/* h1컨테이너 */}
          <div className="text-center text-[#212121] text-[28px] font-semibold leading-[36px]">
            <h1>게시글 작성하기</h1>
          </div>
          {/* 사진 */}
          <div className="flex flex-col items-end gap-[40px] self-stretch">
            <div className="flex items-start gap-[40px] self-stretch">
              <p className="text-[16px] font-semibold leading-[24px]">사진</p>
              <div className="flex w-[148px] h-[148px] p-[4px] flex-col justify-center items-center gap-[4px] border-[1px] rounded-[8px] border-[#C2C2C2] bg-[#F1F1F1]"></div>
              <div className="flex w-[148px] h-[148px] p-[4px] flex-col justify-center items-center gap-[4px] border-[1px] rounded-[8px] border-[#C2C2C2] bg-[#F1F1F1]"></div>
              <div className="flex w-[148px] h-[148px] p-[4px] flex-col justify-center items-center gap-[4px] border-[1px] rounded-[8px] border-[#C2C2C2] bg-[#F1F1F1]"></div>
              <div className="flex w-[148px] h-[148px] p-[4px] flex-col justify-center items-center gap-[4px] border-[1px] rounded-[8px] border-[#C2C2C2] bg-[#F1F1F1]"></div>
              <div className="flex w-[148px] h-[148px] p-[4px] flex-col justify-center items-center gap-[4px] border-[1px] rounded-[8px] border-[#C2C2C2] bg-[#F1F1F1]"></div>
            </div>

            <div className="flex flex-col items-end gap-[32px] self-stretch">
              <section className="flex items-center gap-[40px] self-stretch">
                <h2>카테고리</h2>
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

              <div className="flex items-start gap-[40px] self-stretch">
                <div className="flex">
                  <label className="text-center text-[16px] text-[#212121] font-semibold leading-[24px]">
                    제목
                  </label>
                  <p className="text-[16px] font-semibold leading-[24px] text-[#FF8145]">
                    *
                  </p>
                </div>

                <input
                  className="flex w-[972px] h-[48px] px-[16px] py-[8px] items-center gap-[4px] border-[1px] rounded-[8px] text-[#212121] outline-none text-[14px] font-medium leading-[20px]"
                  type="text"
                  placeholder="제목을 입력해주세요"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-start gap-[40px] self-stretch">
                <div className="flex">
                  <label className="text-center text-[16px] text-[#212121] font-semibold leading-[24px]">
                    내용
                  </label>
                  <p className="text-[16px] font-semibold leading-[24px] text-[#FF8145]">
                    *
                  </p>
                </div>

                <textarea
                  className=" resize-none flex flex-col w-[972px] h-[200px] p-[12px] items-start  justify-between gap-[4px] border-[1px] rounded-[8px] text-[#212121] outline-none text-[14px] font-medium leading-[20px]"
                  placeholder="*커뮤니티 공간은 모두가 함께 하는 공간입니다. 남을 비방하는 말 또는 특정 욕설이 섞인 글은 신고의 대상이 됩니다."
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end items-start gap-[24px] ">
              <button
                type="button"
                className="flex w-[120px] h-[48px] py-0 px-[16px] justify-center items-center gap-[12px] rounded-[8px] text-[14px] font-medium leading-[20px] border-[1px] border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                onClick={handleCancel}
              >
                취소하기
              </button>

              <button
                type="button"
                className="flex w-[120px] h-[48px] py-0 px-[16px] justify-center items-center gap-[12px] rounded-[8px] text-[14px] font-medium leading-[20px] border-[1px] border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                onClick={handleAddPost}
              >
                작성완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
