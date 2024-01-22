"use client";
import Image from "next/image";
import React, { useState } from "react";
import userIcon from "../../app/assets/images/icon/profile.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/shared/firebase";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { Daetgle, Post } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
export default function Daetgle() {
  const { uid, photoURL, displayName, isLogin } = useSelector(
    (state: RootState) => state.login
  );
  const [daetgle, setDaetgle] = useState<string>();
  const { id } = useParams();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setDaetgle(e.target.value);
  };
  const addDaetgle = async () => {
    await addDoc(collection(db, `daetgle${id}`), {
      profile: photoURL,
      uid,
      nickName: displayName,
      content: daetgle,
      postId: id,
      id: "",
    });
  };
  const deleteDaetgle = async (daetgleId: string) => {
    await deleteDoc(doc(db, `daetgle${id}`, `${daetgleId}`));
  };
  const { data: daetgles, isLoading } = useQuery({
    queryKey: [`daetgle${id}`],
    queryFn: () => {
      const getDaetgles = async () => {
        let data: Daetgle[] = [];
        const response = await getDocs(collection(db, `daetgle${id}`));
        response.forEach((daet) => {
          const daetData = daet.data();
          data.push({ ...daetData, id: daet.id });
        });
        return data;
      };

      return getDaetgles();
    },
  });
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addDaetgle,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`daetgle${id}`] });
    },
  });

  const daetgleSubmitHandler = () => {
    if (!isLogin) return alert("로그인하고 오세요");
    mutateToAdd();
  };
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteDaetgle,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`daetgle${id}`] });
    },
  });

  const deleteHandler = (daetgleId: string) => {
    mutateToDelete(daetgleId);
  };
  if (isLoading) return <>로딩중</>;
  return (
    <>
      <div className="flex justify-end gap-[20px]">
        <input
          value={daetgle}
          onChange={(e) => onChangeHandler(e)}
          className="border-2 border-gray-[400] w-[550px] h-[48px] rounded-[10px] outline-none"
          placeholder="댓글을 작성해주세요."
        />
        <button
          onClick={daetgleSubmitHandler}
          className="w-[115px] h-[50px] border-2 rounded-[10px] border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
        >
          댓글남기기
        </button>
      </div>
      {/* 대댓글 컨테이너 */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex">
          <Image className="w-[28px] h-[28px]" src={userIcon} alt="profile" />
          <p>나는 타입스크립트다</p>
          <p>타입스크립트 어떤데~</p>
        </div>
        {daetgles?.map((item) => {
          return (
            <div className="flex" key={nanoid()}>
              {" "}
              <img
                className="w-[28px] h-[28px]"
                src={item.profile}
                alt="profile"
                width={100}
                height={100}
              />
              <p>{item.nickName}</p>
              <p>{item.content}</p>{" "}
              {uid === item.uid && (
                <button
                  onClick={() => deleteHandler(item.id)}
                  className="bg-black text-white"
                >
                  삭제
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
