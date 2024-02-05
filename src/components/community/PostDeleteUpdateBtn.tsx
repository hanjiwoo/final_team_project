"use client";
import { Post } from "@/app/assets/types/types";
import { db } from "@/shared/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import { useRouter } from "next/navigation";

export default function PostDeleteUpdateBtn({ foundPost }: { foundPost: Post | undefined }) {
  const [toggleModal, setToggleModal] = useState(false);
  const route = useRouter();
  const deletePost = async () => {
    const confirmedInfo = window.confirm("정말 삭제하시겠습니까?");
    if (confirmedInfo) {
      route.push("/community");
      await deleteDoc(doc(db, "posts", `${foundPost?.id}`));
    }
  };

  const queryClient = useQueryClient();
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deletePost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  return (
    <div className="flex gap-[16px]">
      <button className="text-[16px] text-[#999999] hover:text-[#E5743E]" onClick={() => setToggleModal(true)}>
        수정
      </button>
      <button className="text-[16px] text-[#999999] hover:text-[#E5743E]" onClick={() => mutateToDelete()}>
        삭제
      </button>
      {toggleModal && <UpdateModal setToggleModal={setToggleModal} foundPost={foundPost} />}
    </div>
  );
}
