"use client";
import Image from "next/image";
import React, { useState } from "react";
import message from "../../app/assets/images/icon/message.png";

import userIcon from "../../app/assets/images/icon/userIcon.png";
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
import CuteHeart from "./CuteHeart";
export default function Daetgle({ post }: { post: Post }) {
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
      {" "}
      <div className="flex justify-start  items-center gap-[6px]">
        <CuteHeart type="normal" postId={post?.id} />
        <Image src={message} className="w-[20px] h-[20px]" alt="댓글" />
        <div className="text-[#999] text-[14px] font-medium leading-[20px]">
          <p>댓글{daetgles?.length}</p>
        </div>
      </div>
      <div className="flex h-[48px] justify-center items-center gap-[4px]">
        <input
          value={daetgle}
          onChange={(e) => onChangeHandler(e)}
          className="border-[1px] border-gray-[400] w-[543px] h-[48px] rounded-[8px] outline-none"
          placeholder="댓글을 작성해주세요."
        />
        <div className="flex justify-center items-center gap-[4px] w-[93px] h-[48px]  rounded-[8px] bg-[#FF8145] hover:bg-[#E5743E] ">
          <button
            onClick={daetgleSubmitHandler}
            className=" text-[14px] font-medium leading-[20px] w-[61px] h-[20px]  text-[#FFFFFF] "
          >
            댓글남기기
          </button>
        </div>
      </div>
      {/* 대댓글 컨테이너 */}
      <div className="flex flex-col items-start gap-[24px] self-stretch ">
        <div className="flex flex-col  self-stretch ">
          {daetgles?.map((item) => {
            return (
              <div
                key={nanoid()}
                className="flex items-center gap-[16px] justify-between"
              >
                <div className="flex gap-[16px]">
                  {" "}
                  <div className="flex items-center gap-[8px]">
                    {item.profile ? (
                      <img
                        className="w-[32px] h-[32px] justify-center items-center"
                        src={item.profile}
                        alt="profile"
                      />
                    ) : (
                      <Image
                        className="w-[28px] h-[28px] rounded-full"
                        src={userIcon}
                        alt="빈유저"
                      />
                    )}
                    <div className="text-[12px] text-center font-medium leading-[18px] text-[#999]">
                      <p>{item.nickName}</p>
                    </div>
                  </div>
                  <p>{item.content}</p>{" "}
                </div>
                {uid === item.uid && (
                  <button
                    onClick={() => deleteHandler(item.id)}
                    className="w-[50px] h-[40px] border-2 rounded-[10px] border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]"
                  >
                    삭제
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
