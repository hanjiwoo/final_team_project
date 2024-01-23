import { typeOfThumbs } from "@/app/assets/types/types";
import { db } from "@/shared/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const getThumbs = async () => {
  let data: typeOfThumbs[] = [];
  // console.log("호출조차 안되니?");
  const response = await getDocs(collection(db, "thumbs"));
  // console.log(/* response, */ "리스판스 잘가져오니?");
  response.forEach((doc) => {
    const docData = doc.data();

    data.push({ ...docData, id: doc.id });
  });

  return data;
};

export const addThumb = async ({
  uid,
  shopId,
}: {
  uid: string;
  shopId: string | string[];
}) => {
  // console.log("추가하기 함수는 돼?");
  await addDoc(collection(db, "thumbs"), {
    uid,
    shopId,
    haha: "hihi",
  });
  // console.log(db, "이건 디비야");
};

export const deleteThumb = async (selectedId: string | undefined) => {
  await deleteDoc(doc(db, "thumbs", `${selectedId}`));
};
