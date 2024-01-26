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
      <div className="flex justify-start w-full items-center mb-[32px]">
        <CuteHeart type="normal" postId={post?.id} />
        <Image
          src={message}
          className="w-[18px] h-[18px] ml-[16px] mr-[6px]"
          alt="댓글"
        />
        <div className="text-[#999] justify-start items-center gap-[4px] flex">
          <div>댓글</div>
          <div>{daetgles?.length}</div>
        </div>
      </div>
      <hr className="w-full"></hr>
      <div className="flex w-full h-[48px] justify-center items-center gap-[12px] my-[32px]">
        <input
          value={daetgle}
          onChange={(e) => onChangeHandler(e)}
          className="border-[1px] border-gray-[400] w-full h-[48px] rounded-[8px] outline-none px-[16px]"
          placeholder="댓글을 작성해주세요."
        />

        <button
          onClick={daetgleSubmitHandler}
          className=" text-[14px] leading-[20px] text-[#FFFFFF] py-[8px] px-[16px] rounded-[8px] bg-[#FF8145] hover:bg-[#E5743E] h-[48px] w-[120px]"
        >
          댓글남기기
        </button>
      </div>

      {/* 대댓글 컨테이너 */}
      <div className="flex w-full justify-center items-center gap-[24px]">
        <div className="flex flex-col w-full">
          {daetgles?.map((item) => {
            return (
              <div className="flex items-center justify-between w-full my-[12px]">
                <div className="flex gap-[16px] items-center" key={nanoid()}>
                  <div className="flex items-center gap-[8px]">
                    {item.profile ? (
                      <img
                        className="w-[32px] h-[32px] rounded-full"
                        src={item.profile}
                        alt="profile"
                      />
                    ) : (
                      <Image
                        className="w-[32px] h-[32px] rounded-full"
                        src={userIcon}
                        alt="빈유저"
                      />
                    )}
                    <div className="text-[12px] text-center text-[#999]">
                      <p>{item.nickName}</p>
                    </div>
                  </div>
                  <div className="text-[14px] text-center text-[black]">
                    <p>{item.content}</p>
                  </div>
                </div>
                <div>
                  {uid === item.uid && (
                    <button
                      onClick={() => deleteHandler(item.id)}
                      className="text-[14px] text-[#999999] hover:text-[#E5743E]"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
