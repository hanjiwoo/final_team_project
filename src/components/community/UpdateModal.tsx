"use client";
import React, { ChangeEvent, useState } from "react";
import CategoryBtn from "./CategoryBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/app/assets/types/types";
import { RootState } from "@/redux/config/configStore";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/shared/firebase";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateModal({
  setToggleModal,
  foundPost
}: {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  foundPost: Post | undefined;
}) {
  const backHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setToggleModal(false);
    }
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const route = useRouter();
  const { uid, displayName, isLogin, photoURL } = useSelector((state: RootState) => state.login);
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    uid,
    title: "",
    content: "",
    profile: photoURL,
    nickname: displayName,
    createdAt: 1004,
    category: ""
  });

  const queryClient = useQueryClient();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setNewPost({ ...newPost, [name]: value });
    // console.log(newPost);
  };
  const updatePost = async () => {
    await updateDoc(doc(db, "posts", `${foundPost?.id}`), {
      title: newPost.title,
      content: newPost.content,
      category: newPost.category
    });
  };
  const { mutate: mutateToUpdate } = useMutation({
    mutationFn: updatePost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const handleUpdatePost = async () => {
    if (!isLogin)
      return toast.error("로그인하셔야 게시물을 남길 수 있습니다", {
        transition: Slide,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    if (!newPost.content || !newPost.title || !newPost.category)
      return toast.error("카테고리 타이틀 컨텐츠를 작성해 주세요", {
        transition: Slide,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    const confirmResult = window.confirm("게시글 수정을 하시겠습니까?");
    if (confirmResult) {
      toast.success("작성이 완료되었습니다", {
        transition: Slide,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      setToggleModal(false);
      mutateToUpdate();
    }
  };

  const handleCancel = () => {
    setToggleModal(false);
  };

  return (
    <section
      onClick={(e) => backHandler(e)}
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      className="w-full h-full fixed top-0 left-0  flex justify-center items-center"
    >
      {/* <div className="bg-white w-1/2 h-1/2"></div> */}
      {/* 전체 컨테이너 */}
      <div className=" flex flex-col bg-white items-center justify-center p-10 m-[60px 420px]">
        {/* gap주려고 묶음 */}
        <div className="flex flex-col gap-[30px]">
          {/* h1컨테이너 */}
          <div className="mr-[45%]">
            <h1 className="text-[30px] font-bold">게시글 작성하기</h1>
          </div>
          <section className="flex items-center gap-10">
            <h2>카테고리</h2>
            {/* <CategoryBtn
              text="전체모음"
              type=""
              setNewPost={setNewPost}
              newPost={newPost}
            /> */}
            <CategoryBtn text="일상이야기" type="" setNewPost={setNewPost} newPost={newPost} />
            <CategoryBtn text="맛집추천" type="" setNewPost={setNewPost} newPost={newPost} />
            <CategoryBtn text="취미생활" type="" setNewPost={setNewPost} newPost={newPost} />
            <CategoryBtn text="문의하기" type="" setNewPost={setNewPost} newPost={newPost} />
          </section>
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
              <button
                type="button"
                className="rounded-[10px] w-[100px] h-[50px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                onClick={handleUpdatePost}
              >
                수정완료
              </button>

              <button
                type="button"
                className="rounded-[10px] w-[100px] h-[50px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                onClick={handleCancel}
              >
                취소하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
