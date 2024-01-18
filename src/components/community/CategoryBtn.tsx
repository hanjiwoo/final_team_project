import { Post } from "@/app/assets/types/types";
import { StaticImageData } from "next/image";
import React from "react";

export default function CategoryBtn({
  text,
  type,
  setNewPost,
  newPost,
}: {
  text: string;
  type: string;
  setNewPost: React.Dispatch<React.SetStateAction<Post>>;
  newPost: Post;
}) {
  const categorySubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
        className={`p-[5px] rounded-full border-2 border-black ${
          newPost.category === text && "bg-orange-500"
        }`}
      >
        {text}
      </button>
    </>
  );
}
