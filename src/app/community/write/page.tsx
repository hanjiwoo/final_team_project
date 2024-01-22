"use client";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState, ChangeEvent } from "react";
import { db, storage } from "@/shared/firebase";
import { Post } from "@/app/assets/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CategoryBtn from "@/components/community/CategoryBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { StaticImageData } from "next/image";
import { url } from "inspector";
import { nanoid } from "nanoid";
import { ref, uploadBytes } from "firebase/storage";

export default function WritePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [urlFiles, setUrlFiles] = useState<string[]>();
  const [imgFiles, setImgFiles] = useState<File[]>();
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

    if (imgFiles) {
      for (let i = 0; i < imgFiles.length; i++) {
        const storageRef = ref(storage, `${uid}/${newPost.createdAt}/${i}`);
        await uploadBytes(storageRef, imgFiles[i]);
      }
    }
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

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files, "이거나 보자");
    if (e.target.files) {
      if (e.target.files?.length > 5) {
        return alert("5개 까지 가능합니다");
      }
      e.target.files[0];
      let arr = [];
      let arr2 = [];
      for (let i = 0; i < e.target.files.length; i++) {
        arr.push(URL.createObjectURL(e.target.files[i]));
        arr2.push(e.target.files[i]);
      }
      // console.log(arr, "배열에 잘들어감?");
      setUrlFiles(arr);
      setImgFiles(arr2);
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
          <div className="flex">
            <h2>사진</h2>
            <label>
              <div className="bg-yellow-200 w-[100px] h-[100px]">
                사진고르던가{" "}
              </div>
              <input
                className="hidden"
                type="file"
                multiple
                onChange={(e) => fileChangeHandler(e)}
              />
            </label>
            {urlFiles?.map((file) => {
              return <img key={nanoid()} width={200} height={200} src={file} />;
            })}
          </div>
          <section className="flex items-center gap-10">
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
                onClick={handleAddPost}
              >
                작성완료
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
    </>
  );
}
