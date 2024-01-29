import { typeOfHoogi } from "@/app/assets/types/types";
import { db } from "@/shared/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const getHoogis = async (shopId: string | string[]) => {
  let data: typeOfHoogi[] = [];
  const response = await getDocs(collection(db, `hoogis${shopId}`));
  response.forEach((hoogi) => {
    const hoogiData = hoogi.data();
    data.push({ ...hoogiData, id: hoogi.id });
  });
  return data;
};

export const addHoogi = async ({
  uid,
  displayName,
  맛,
  가격,
  위생,
  서비스,

  shopId,
}: typeOfHoogi) => {
  await addDoc(collection(db, `hoogis${shopId}`), {
    uid,
    displayName,
    맛,
    가격,
    위생,
    서비스,
    shopId,
  });
};

export const deleteHoogi = async ({
  shopId,
  selectedId,
}: {
  shopId: string | string[];
  selectedId: string | undefined;
}) => {
  await deleteDoc(doc(db, `hoogis${shopId}`, `${selectedId}`));
};
