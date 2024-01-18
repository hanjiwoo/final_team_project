"use client";
import { Post } from "@/app/assets/types/types";
import { db } from "@/shared/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import { useRouter } from "next/navigation";

export default function PostDeleteUpdateBtn({
  foundPost,
}: {
  foundPost: Post | undefined;
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const route = useRouter();
  const deletePost = async () => {
    const confirmedInfo = window.confirm("정말 삭제하시겠습까");
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
    },
  });

  return (
    <>
      <button className="bg-orange-500" onClick={() => setToggleModal(true)}>
        수정
      </button>
      <button className="bg-purple-500" onClick={() => mutateToDelete()}>
        삭제
      </button>
      {toggleModal && (
        <UpdateModal setToggleModal={setToggleModal} foundPost={foundPost} />
      )}
    </>
  );
}
