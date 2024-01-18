import { typeOfHeart } from "@/app/assets/types/types";
import { db } from "@/shared/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const getHearts = async () => {
  let data: typeOfHeart[] = [];
  const response = await getDocs(collection(db, "hearts"));
  response.forEach((doc) => {
    const docData = doc.data();

    data.push({ ...docData, id: doc.id });
  });

  return data;
};

export const addHeart = async ({
  uid,
  postId,
}: {
  uid: string;
  postId: string | undefined;
}) => {
  await addDoc(collection(db, "hearts"), {
    uid,
    postId,
    haha: "hoho",
  });
};

export const deleteHeart = async (selectedId: string | undefined) => {
  await deleteDoc(doc(db, "hearts", `${selectedId}`));
};
