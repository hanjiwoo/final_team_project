"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { deleteHoogi, getHoogis } from "./queryFns";
import { typeOfHoogi } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
// import { type } from "os";

export default function DoneAssess() {
  const { id: shopId } = useParams();
  // const { data: thumbs, isLoading } = useQuery({
  //   queryKey: ["thumbs"],
  //   queryFn: getThumbs,
  // });
  const queryClient = useQueryClient();
  const { data: hoogis, isLoading } = useQuery({
    queryKey: [`hoogis${shopId}`],
    queryFn: () => getHoogis(shopId),
  });
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteHoogi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`hoogis${shopId}`] });
    },
  });

  const deleteHandler = (selectedId: string | undefined) => {
    mutateToDelete({ shopId, selectedId });
  };

  const router = useRouter();
  const hahaha = () => {
    console.log(window.location.origin, "라우터를 확인해 봅시다.");
  };
  if (isLoading) {
    return <>로딩중 ..</>;
  }
  return (
    <>
      <div className="bg-cyan-200 h-[200px] w-[900px] flex flex-col justify-start items-center justify-start  ">
        {hoogis?.map((hoogi: typeOfHoogi) => {
          return (
            <div
              key={nanoid()}
              className="bg-green-100 h-[22px] flex justify-center mt-1 items-center gap-3"
            >
              <p>userid:{hoogi.uid}</p>
              <p>{hoogi.shopId}</p>
              <p>{hoogi.face}</p>
              {/*   <p>{hoogi.id}</p> */}
              <p>{hoogi.가격}</p>
              {hoogi.맛} {hoogi.서비스}
              <p>{hoogi.위생}</p>
              <p>{hoogi.range}점</p>
              <button
                className="bg-black text-white"
                onClick={() => deleteHandler(hoogi.id)}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={hahaha}>확인버튼</button>
    </>
  );
}
