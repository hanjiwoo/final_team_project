"use client";
import HeartEmpty from "../../app/assets/images/icon/heart_off.png";
import HeartFull from "../../app/assets/images/icon/heart_on.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addHeart, deleteHeart, getHearts } from "./Fns";
import { typeOfHeart } from "@/app/assets/types/types";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { toast } from "react-toastify";

export default function CuteHeart({ postId, type }: { postId: string | undefined; type: string }) {
  const { isLogin, uid } = useSelector((state: RootState) => state.login);
  const [disable, setDisable] = useState(false);
  const { data: hearts, isLoading } = useQuery({
    queryKey: [`hearts`],
    queryFn: getHearts
  });
  // console.log(thumbs, "데이터 잘 받고 있나?");
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addHeart,
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["hearts"] });
    // },
    onMutate: async (newHeart) => {
      setDisable(true);
      await queryClient.cancelQueries({ queryKey: [`hearts`] });

      const previousHeart = queryClient.getQueryData([`hearts`]);

      queryClient.setQueryData([`hearts`], (old: typeOfHeart[]) => [...old, newHeart]);

      return { previousHeart };
    },

    onError: (err, newHeart, context) => {
      queryClient.setQueryData([`hearts`], context?.previousHeart);
      setDisable(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`hearts`] });
      setDisable(false);
    }
  });
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteHeart,
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["thumbs"] });
    // },
    onMutate: async (newHeart) => {
      setDisable(true);
      await queryClient.cancelQueries({ queryKey: [`hearts`] });

      const previousHeart = queryClient.getQueryData([`hearts`]);

      queryClient.setQueryData([`hearts`], (old: typeOfHeart[]) => [...old, newHeart]);

      return { previousHeart };
    },

    onError: (err, newHeart, context) => {
      queryClient.setQueryData([`hearts`], context?.previousHeart);
      setDisable(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`hearts`] });
      setDisable(false);
    }
  });
  const filteredhearts = hearts?.filter((heart) => {
    return heart?.postId === postId;
  });
  const filterdheart = hearts?.find((heart) => {
    return heart?.postId === postId && heart?.uid === uid;
  });
  const selectedId = filterdheart?.id;
  const HeartUpHandler = () => {
    if (type === "small") return;
    if (disable) return;
    if (!isLogin) return toast.warning("로그인 후에 이용이 가능합니다.");
    // setLIke(!like);

    if (filterdheart) {
      mutateToDelete(selectedId);
      // console.log("삭제", "셀렉티드아이디", selectedId);
    } else {
      mutateToAdd({ uid, postId });
      // console.log("추가하기 되고 있니?", uid, shopId);
    }
  };
  if (isLoading) {
    return <>로딩중</>;
  }
  return (
    <>
      {/* <LikeButton $like={like.toString()} onClick={likeBTN}>
    좋아요 버튼
  </LikeButton> */}
      <div className="flex items-center gap-[4px]">
        <div onClick={HeartUpHandler}>
          {filterdheart ? (
            <Image
              width={100}
              height={100}
              className="w-[20px] h-[20px] max-sm:w-[16px] max-sm:h-[16px]"
              id="이미지"
              src={HeartFull}
              alt="빨간따봉"
            ></Image>
          ) : (
            <Image
              width={100}
              height={100}
              className="w-[20px] h-[20px] max-sm:w-[16px] max-sm:h-[16px]"
              id="이미지"
              src={HeartEmpty}
              alt="빈따봉"
            ></Image>
          )}
        </div>
        <div>
          <p className="text-[14px] text-[#FF8145] max-sm:text-[12px]">공감해요 {filteredhearts?.length}</p>
        </div>
      </div>
    </>
  );
}
