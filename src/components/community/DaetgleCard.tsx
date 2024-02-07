"use client";
import { Daetgle } from "@/app/assets/types/types";
import Image from "next/image";
import React from "react";
import userIcon from "../../app/assets/images/icon/userIcon.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/shared/firebase";
export default function DaetgleCard({ item, uid }: { item: Daetgle; uid: string }) {
  const queryClient = useQueryClient();
  const deleteDaetgle = async (daetgleId: string) => {
    await deleteDoc(doc(db, `daetgle`, `${daetgleId}`));
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
  return (
    <div className="flex gap-[16px] items-center w-full justify-between">
      <div className="flex items-center justify-start w-full my-[12px] gap-[16px]">
        <div className="flex items-center gap-[8px]">
          {item.profile ? (
            <img className="w-[32px] h-[32px] rounded-full" src={item.profile} alt="profile" />
          ) : (
            <Image width={100} height={100} className="w-[32px] h-[32px] rounded-full" src={userIcon} alt="빈유저" />
          )}
          <div className="text-[12px] text-center text-[#999]">
            <p className="w-[50px] text-left">{item.nickName}</p>
          </div>
        </div>
        <div className="text-[14px] text-center text-[black]">
          <p className="text-left">{item.content}</p>
        </div>
      </div>
      <div>
        {uid === item.uid && (
          <button
            onClick={() => deleteHandler(item.id)}
            className="text-[14px] text-[#999999] hover:text-[#E5743E] w-[25px]"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
