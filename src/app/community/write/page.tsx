"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState, ChangeEvent } from "react";
import { db } from "@/shared/firebase";
import { Post } from "@/app/assets/types/types";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";

const WritePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const postsCollection = collection(db, "posts");
  //     const querySnapshot = await getDocs(postsCollection);
  //     const postsData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Post[];
  //     setPosts(postsData);
  //   };

  //   fetchPosts();
  // }, []);

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
    // const postsCollection = collection(db, "posts");
    // await addDoc(postsCollection, newPost);

    // const updatedPosts = await getDocs(postsCollection);
    // const updatedPostsData = updatedPosts.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // })) as Post[];
    // setPosts(updatedPostsData);
    mutateToAdd();

    // setNewPost({ title: "", content: "" });
  };

  const handleUpdatePost = async (id: string, updatedPost: Partial<Post>) => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, updatedPost);

    const updatedPosts = await getDocs(collection(db, "posts"));
    const updatedPostsData = updatedPosts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
    setPosts(updatedPostsData);
  };

  const handleDeletePost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);

    const updatedPosts = await getDocs(collection(db, "posts"));
    const updatedPostsData = updatedPosts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
    setPosts(updatedPostsData);
  };

  return (
    <>
      <div className=" flex flex-col items-center justify-center w-[100%] h-[100%] m-[60px 420px]">
        <div className="">
          <h1 className="text-[30px] font-bold">게시물 작성하기</h1>
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
                등록하기
              </button>
            </Link>
            <Link href={"/community"}>
              <button className="rounded-[10px] w-[100px] h-[50px] border-2 border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]">
                취소하기
              </button>
            </Link>
          </div>
        </form>

        {/* <div>
          <h1>게시물 리스트</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.content}</p>
                <button
                  className="border-2 border-black"
                  onClick={() =>
                    handleUpdatePost(post.id, { title: "Updated Title" })
                  }
                >
                  수정하기
                </button>
                <button
                  className="border-2 border-black"
                  onClick={() => handleDeletePost(post.id)}
                >
                  삭제하기
                </button>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};
export default WritePage;
