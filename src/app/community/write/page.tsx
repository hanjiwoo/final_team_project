"use client";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState, ChangeEvent } from "react";
import { db } from "@/shared/firebase";
import { Post } from "@/app/assets/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function WritePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    content: "",
    profile: "",
    nickname: "",
    createdAt: new Date(),
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
    const confirmResult = window.confirm("게시글 작성을 하시겠습니까?");
    if (confirmResult) {
      alert("작성이 완료되었습니다.");
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
      {/* 전체 컨테이너 */}
      <div className=" flex flex-col items-center justify-center w-[100%] h-[100%] m-[60px 420px]">
        {/* gap주려고 묶음 */}
        <div className="flex flex-col gap-[30px]">
          {/* h1컨테이너 */}
          <div className="mr-[45%]">
            <h1 className="text-[30px] font-bold">게시글 작성하기</h1>
          </div>

          <form className="flex flex-col items-center justify-center gap-[50px]">
            <div className="flex gap-[10px]">
              <div className="flex">
                <label className="">제목</label>
                <p className="text-[#FF8145]">*</p>
              </div>

              <input
                className="border-2 border-gray-[400] w-[972px] h-[48px] rounded-[10px] outline-none"
                type="text"
                placeholder="제목을 입력해주세요"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-[10px]">
              <div className="flex">
                <label className="">내용</label>
                <p className="text-[#FF8145]">*</p>
              </div>

              <textarea
                className="border-2 border-gray-[400] w-[972px] h-[200px] resize-none rounded-[10px] outline-none"
                placeholder="*커뮤니티 공간은 모두가 함께 하는 공간입니다. 남을 비방하는 말 또는 특정 욕설이 섞인 글은 신고의 대상이 됩니다."
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-[25px] self-end flex-row-reverse">
              <Link href={"/community"}>
                <button
                  className="rounded-[10px] w-[100px] h-[50px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                  onClick={handleAddPost}
                >
                  작성하기
                </button>
              </Link>

              <Link href={"/community"}>
                <button
                  className="rounded-[10px] w-[100px] h-[50px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                  onClick={handleCancel}
                >
                  취소하기
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
