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
import Image, { StaticImageData } from "next/image";
import { url } from "inspector";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imgRegister from "../../../app/assets/images/imgRegister.png";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WritePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [urlFiles, setUrlFiles] = useState<string[]>();
  const [imgFiles, setImgFiles] = useState<File[]>();
  const route = useRouter();
  const { uid, displayName, isLogin, photoURL } = useSelector((state: RootState) => state.login);
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    uid,
    title: "",
    content: "",
    profile: photoURL,
    nickname: displayName,
    createdAt: Date.now(),
    category: "",
    photos: [""]
  });
  const addPost = async () => {
    try {
      let arr = [];
      if (imgFiles) {
        for (let i = 0; i < imgFiles.length; i++) {
          const storageRef = ref(storage, `${uid}/${newPost.createdAt}/${i}`);
          await uploadBytes(storageRef, imgFiles[i]);
          const downloadURL = await getDownloadURL(storageRef);
          // console.log(downloadURL);
          arr.push(downloadURL);
        }
      }
      await addDoc(collection(db, "posts"), { ...newPost, photos: arr });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addPost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      route.push("/community");
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setNewPost({ ...newPost, [name]: value });
    // console.log(newPost);
  };

  const handleAddPost = async () => {
    if (!isLogin)
      return toast.error("로그인을 해주세요.", {
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

    if (!newPost.content || !newPost.title || !newPost.category)
      // return toast.error("카테고리 타이틀 컨텐츠를 작성해 주세요");
      return toast.error("카테고리 제목 내용을 작성해 주세요.", {
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
    const confirmResult = window.confirm("게시글 작성을 하시겠습니까?");
    if (confirmResult) {
      toast.success("작성이 완료되었습니다.", {
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

      mutateToAdd();
    }
  };

  const handleCancel = () => {
    route.push("/community");
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files, "이거나 보자");
    if (e.target.files) {
      if (e.target.files?.length > 3) {
        return toast.error("최대 3장까지 가능합니다.", {
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
      }
      if (urlFiles) {
        if (urlFiles.length + e.target.files.length > 3) {
          return toast.error("최대 3장까지 가능합니다.", {
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
        }
      }
      e.target.files[0];
      let arr = [];
      let arr2 = [];
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size > 1000000) {
          return toast.error("파일 사이즈가 너무 큽니다.");
        }
        arr.push(URL.createObjectURL(e.target.files[i]));
        arr2.push(e.target.files[i]);
      }

      if (urlFiles) {
        setUrlFiles([...urlFiles, ...arr]);
      } else {
        setUrlFiles(arr);
      }
      if (imgFiles) {
        setImgFiles([...imgFiles, ...arr2]);
      } else {
        setImgFiles(arr2);
      }
    }
  };

  const removeFromImages = (file: string, index: number) => {
    const filteredUrlFiles = urlFiles?.filter((item) => {
      return item !== file;
    });

    setUrlFiles(filteredUrlFiles);
    if (index) {
      imgFiles?.splice(index, 1);
      setImgFiles(imgFiles);
    }

    // console.log(filteredUrlFiles, index, imgFiles, " 요거보자");
  };
  return (
    <>
      <div className="flex justify-center items-center w-full">
        {/* 전체 컨테이너 */}

        <div className="flex py-[60px] flex-col items-center gap-[60px] w-[1080px] justify-center px-[20px]">
          <div className="flex justify-center items-center flex-col gap-[60px] w-full">
            <div className="w-full flex gap-[60px] flex-col">
              {/* h1컨테이너 */}
              <div className="text-left text-[#212121] text-[28px] font-semibold leading-[36px]">
                <h1>게시글 작성하기</h1>
              </div>
              {/* 사진 */}
              <div className="flex flex-col gap-[40px] justify-center">
                <div className="flex gap-[40px] ">
                  <p className="text-[16px] font-semibold leading-[24px] w-[90px]">사진</p>
                  <div className="w-full flex gap-[20px]">
                    <label>
                      <Image
                        src={imgRegister}
                        width={148}
                        height={148}
                        alt="사진등록"
                        className="cursor-pointer rounded-lg"
                      />

                      <input
                        className="hidden"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => fileChangeHandler(e)}
                      />
                    </label>
                    {urlFiles?.map((file, index) => {
                      return (
                        <div
                          key={nanoid()}
                          className="relative flex w-[148px] h-[148px] p-[4px] flex-col justify-center items-center gap-[4px] border-[1px] rounded-[8px] border-[#C2C2C2] bg-[#F1F1F1]"
                        >
                          <Image
                            src={file}
                            width={200}
                            height={200}
                            className="relative w-[124px] h-[124px]"
                            alt="고른사진"
                          />
                          <button
                            onClick={() => removeFromImages(file, index)}
                            className="absolute top-[-5px] right-1 text-[#212121] w-[7px]"
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-[32px] ">
                  <div className="flex gap-[28px] w-full max-sm:gap-0">
                    <div className="flex w-[90px]">
                      <label className="text-[16px] text-[#212121] font-semibold leading-[24px] max-sm:text-[14px] max-sm:leading-[20px]">
                        카테고리&nbsp;
                      </label>
                      <p className="text-[16px] font-semibold leading-[24px] text-[#FF8145]">*</p>
                    </div>
                    <div className="sm:flex sm:flex-row gap-[12px] max-sm:grid max-sm:grid-cols-2">
                      <CategoryBtn text="일상이야기" type="" setNewPost={setNewPost} newPost={newPost} />
                      <CategoryBtn text="맛집추천" type="" setNewPost={setNewPost} newPost={newPost} />
                      <CategoryBtn text="취미생활" type="" setNewPost={setNewPost} newPost={newPost} />
                      <CategoryBtn text="문의하기" type="" setNewPost={setNewPost} newPost={newPost} />
                    </div>
                  </div>

                  <div className="flex gap-[40px] w-full max-sm:gap-[15px]">
                    <div className="flex w-[90px]">
                      <label className="text-center text-[16px] text-[#212121] font-semibold leading-[24px] max-sm:text-[14px] max-sm:leading-[20px]">
                        제목&nbsp;
                      </label>
                      <p className="text-[16px] font-semibold leading-[24px] text-[#FF8145]">*</p>
                    </div>

                    <input
                      className="flex w-full h-[48px] px-[16px] py-[8px] gap-[4px] border-[1px] rounded-[8px] text-[#212121] text-[14px] font-medium leading-[20px] focus:outline-none focus:ring-0 focus:border-[#ff8145]"
                      type="text"
                      placeholder="제목을 입력해주세요."
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      maxLength={20}
                    />
                  </div>

                  <div className="flex gap-[40px] w-full max-sm:gap-[15px]">
                    <div className="flex w-[90px]">
                      <label className="text-center text-[16px] text-[#212121] font-semibold leading-[24px] max-sm:text-[14px] max-sm:leading-[20px]">
                        내용&nbsp;
                      </label>
                      <p className="text-[16px] font-semibold leading-[24px] text-[#FF8145]">*</p>
                    </div>

                    <textarea
                      className=" resize-none flex flex-col w-full h-[200px] p-[12px]  justify-between gap-[4px] border-[1px] rounded-[8px] text-[#212121] outline-none text-[14px] font-medium leading-[20px] focus:outline-none focus:ring-0 focus:border-[#ff8145]"
                      placeholder=" 커뮤니티 공간은 모두가 함께 하는 공간입니다. 남을 비방하는 말 또는 특정 욕설이 섞인 글은 신고의 대상이 됩니다."
                      name="content"
                      value={newPost.content}
                      onChange={handleInputChange}
                      maxLength={400}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-[24px] ">
                  <button
                    type="button"
                    className="flex w-[120px] h-[48px] py-0 px-[16px] justify-center items-center gap-[12px] rounded-[8px] text-[14px] font-medium leading-[20px] border-[1px] border-grey bg-[white]"
                    onClick={handleCancel}
                  >
                    취소하기
                  </button>

                  <button
                    // disabled={!newPost.title || !newPost.content}
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
        </div>
      </div>
    </>
  );
}
