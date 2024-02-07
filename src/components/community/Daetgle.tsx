"use client";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import message from "../../app/assets/images/icon/message.png";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { Daetgle, Post } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import CuteHeart from "./CuteHeart";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import moeumLoading from "../../app/assets/images/moeumLoading.gif";
import "react-toastify/dist/ReactToastify.css";
import DaetgleCard from "./DaetgleCard";
export default function Daetgle({ post }: { post: Post }) {
  const { uid, photoURL, displayName, isLogin } = useSelector((state: RootState) => state.login);
  const [daetgle, setDaetgle] = useState<string>();
  const { id } = useParams();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setDaetgle(e.target.value);
  };
  const addDaetgle = async () => {
    await addDoc(collection(db, `daetgle`), {
      profile: photoURL,
      uid,
      nickName: displayName,
      content: daetgle,
      postId: id,
      id: "",
      createdAt: Date.now()
    });
  };
  const deleteDaetgle = async (daetgleId: string) => {
    await deleteDoc(doc(db, `daetgle`, `${daetgleId}`));
  };
  const { data: daetgles, isLoading } = useQuery({
    queryKey: [`daetgle`],
    queryFn: () => {
      const getDaetgles = async () => {
        let data: Daetgle[] = [];
        const response = await getDocs(collection(db, `daetgle`));
        response.forEach((daet) => {
          const daetData = daet.data();
          data.push({ ...daetData, id: daet.id });
        });
        return data;
      };

      return getDaetgles();
    }
  });
  const filterdDaetgles = daetgles
    ?.filter((daetgle) => {
      return daetgle.postId === id;
    })
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt - a.createdAt;
      }
      return 1;
    });
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addDaetgle,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`daetgle`] });
      setDaetgle("");
    }
  });

  const daetgleSubmitHandler = () => {
    if (!isLogin)
      return toast.error("로그인을 해주세요", {
        transition: Slide,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    mutateToAdd();
  };
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteDaetgle,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`daetgle`] });
    }
  });

  const deleteHandler = (daetgleId: string) => {
    mutateToDelete(daetgleId);
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Image src={moeumLoading} alt="loading" className="w-[300px] h-[300px]" />
      </div>
    );
  return (
    <>
      <div className="flex justify-start w-full items-center mb-[32px]">
        <CuteHeart type="normal" postId={post?.id} />
        <Image width={100} height={100} src={message} className="w-[18px] h-[18px] ml-[16px] mr-[6px]" alt="댓글" />
        <div className="text-[#999] text-[14px] max-sm:text-[12px] justify-start items-center gap-[4px] flex">
          <div>댓글</div>
          <div>{filterdDaetgles?.length}</div>
        </div>
      </div>
      <hr className="w-full"></hr>
      <div className="flex w-full h-[48px] justify-center items-center gap-[12px] my-[32px]">
        <input
          value={daetgle}
          onChange={(e) => onChangeHandler(e)}
          className="text-[14px] border-[1px] border-gray-[400] w-full h-[48px] rounded-[8px] outline-none px-[16px]"
          placeholder="댓글을 작성해주세요."
          maxLength={50}
        />

        <button
          onClick={daetgleSubmitHandler}
          className=" text-[14px] leading-[20px] text-[#FFFFFF] py-[8px] px-[16px] rounded-[8px] bg-[#FF8145] hover:bg-[#E5743E] h-[48px] w-[120px]"
        >
          댓글 작성
        </button>
      </div>

      {/* 대댓글 컨테이너 */}
      <div className="flex w-full justify-center items-center gap-[24px]">
        <div className="flex flex-col w-full">
          {filterdDaetgles?.map((item) => {
            return (
              <React.Fragment key={nanoid()}>
                <DaetgleCard item={item} uid={uid} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
