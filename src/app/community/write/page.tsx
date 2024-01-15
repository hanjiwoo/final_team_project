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

const WritePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleAddPost = async () => {
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, newPost);

    const updatedPosts = await getDocs(postsCollection);
    const updatedPostsData = updatedPosts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
    setPosts(updatedPostsData);

    setNewPost({ title: "", content: "" });
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
      <div className=" w-48 h-96 m-auto">
        <div>
          <h2>게시물 작성</h2>
          <input
            className="border-2 border-black w-80 h-10"
            type="text"
            placeholder="제목을 입력해주세요"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <textarea
            className="border-2 border-black w-96 h-96  "
            placeholder="내용을 입력해주세요."
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          />
          <button className="border-2 border-black" onClick={handleAddPost}>
            등록하기
          </button>
          <button className="border-2 border-black">취소하기</button>
        </div>
        <div>
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
        </div>
      </div>
    </>
  );
};
export default WritePage;
