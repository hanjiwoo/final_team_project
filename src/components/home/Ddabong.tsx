"use client";
import emptyThumb from "../../app/assets/images/빈따봉.png";
import redThumb from "../../app/assets/images/빨간따봉.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addThumb, deleteThumb, getThumbs } from "./Fns";
import { typeOfThumbs } from "@/app/assets/types/types";
import Image from "next/image";
import { useState } from "react";
export default function Ddabong({
  name,
  shopId,
  type,
}: {
  name: string;
  shopId: string | string[];
  type: string;
}) {
  const fakeUser = {
    isLogin: true,
    uid: 1,
    name: "han",
  };
  const { uid } = fakeUser;
  const [disable, setDisable] = useState(false);
  const { data: thumbs, isLoading } = useQuery({
    queryKey: [`thumbs`],
    queryFn: getThumbs,
  });
  // console.log(thumbs, "데이터 잘 받고 있나?");
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addThumb,
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["thumbs"] });
    // },
    onMutate: async (newThumb) => {
      setDisable(true);
      await queryClient.cancelQueries({ queryKey: [`thumbs`] });

      const previousThumbs = queryClient.getQueryData([`thumbs`]);

      queryClient.setQueryData([`thumbs`], (old: typeOfThumbs[]) => [
        ...old,
        newThumb,
      ]);

      return { previousThumbs };
    },

    onError: (err, newThumb, context) => {
      queryClient.setQueryData([`thumbs`], context?.previousThumbs);
      setDisable(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`thumbs`] });
      setDisable(false);
    },
  });
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteThumb,
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["thumbs"] });
    // },
    onMutate: async (newThumb) => {
      setDisable(true);
      await queryClient.cancelQueries({ queryKey: [`thumbs`] });

      const previousThumbs = queryClient.getQueryData([`thumbs`]);

      queryClient.setQueryData([`thumbs`], (old: typeOfThumbs[]) => [
        ...old,
        newThumb,
      ]);

      return { previousThumbs };
    },

    onError: (err, newThumb, context) => {
      queryClient.setQueryData([`thumbs`], context?.previousThumbs);
      setDisable(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`thumbs`] });
      setDisable(false);
    },
  });
  const filteredThunmbs = thumbs?.filter((thumb) => {
    return thumb?.shopId === shopId;
  });
  const filterdThumb = thumbs?.find((thumb) => {
    return thumb?.shopId === shopId && thumb?.uid === fakeUser.uid;
  });
  const selectedId = filterdThumb?.id;
  const ThumbUpHandler = () => {
    if (type === "small") return;
    if (disable) return;
    if (!fakeUser.isLogin) return alert("로그인 후에 이용이 가능합니다.");
    // setLIke(!like);

    if (filterdThumb) {
      mutateToDelete(selectedId);
      // console.log("삭제", "셀렉티드아이디", selectedId);
    } else {
      mutateToAdd({ uid, shopId });
      // console.log("추가하기 되고 있니?", uid, shopId);
    }
  };
  if (isLoading) {
    return <>로딩중...</>;
  }
  return (
    <>
      {/* <LikeButton $like={like.toString()} onClick={likeBTN}>
    좋아요 버튼
  </LikeButton> */}
      <div className="flex items-center justify-center w-7/12 gap-1">
        <div
          className={`overflow-hidden ${
            type !== "small" ? "w-[30px] h-[30px]" : "w-[15px] h-[15px]"
          } flex justify-center items-center rounded-full`}
          onClick={ThumbUpHandler}
        >
          {filterdThumb ? (
            <Image
              className="w-full h-full"
              id="이미지"
              src={redThumb}
              alt="빨간따봉"
            ></Image>
          ) : (
            <Image
              className="w-full h-full"
              id="이미지"
              src={emptyThumb}
              alt="빈따봉"
            ></Image>
          )}
        </div>
        <div className="text-red-500 text-sm text-center">
          {filteredThunmbs?.length}
        </div>
      </div>
    </>
  );
}
