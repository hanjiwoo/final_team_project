import { Post } from "@/app/assets/types/types";
import { StaticImageData } from "next/image";
import React from "react";

export default function CategoryBtn({
  text,
  type,
  setNewPost,
  newPost
}: {
  text: string;
  type: string;
  setNewPost: React.Dispatch<React.SetStateAction<Post>>;
  newPost: Post;
}) {
  const categorySubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;
    // console.log(name, text, "이거 되나?");
    setNewPost({ ...newPost, [name]: text });
    // console.log(newPost, "이거 되나?");
  };

  return (
    <>
      <button
        name="category"
        onClick={(e) => categorySubmit(e)}
        className={`flex h-[40px] justify-center items-center px-[12px] py-[8px] rounded-[100px] border-[1px] border-[#D6D6D6 text-[14px] text-[#212121]  ${
          newPost.category === text &&
          "bg-[#FF8145] text-[#FFFFFF] text-center text-[14px] leading-[20px] border-[#FF8145] justify-center items-center"
        }`}
      >
        {text}
      </button>
    </>
  );
}
