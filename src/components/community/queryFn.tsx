import { Post } from "@/app/assets/types/types";
import { db } from "@/shared/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getPosts = async () => {
  let data: Post[] = [];
  const response = await getDocs(collection(db, "posts"));
  response.forEach((post) => {
    const postData = post.data();
    data.push({ ...postData, id: post.id });
  });

  return data;
};
