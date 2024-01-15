"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { deleteHoogi, getHoogis } from "./queryFns";
import { typeOfHoogi } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import PostModal from "./PostModal";
// import { type } from "os";
// let DoneHoogis = {
//   맛1: 0,
//   맛2: 0,
//   맛3: 0,
//   가격1: 0,
//   가격2: 0,
//   가격3: 0,
//   위생1: 0,
//   위생2: 0,
//   위생3: 0,
//   서비스1: 0,
//   서비스2: 0,
//   서비스3: 0,
// };
export default function DoneAssess() {
  const { id: shopId } = useParams();
  const [modal, setModal] = useState(false);
  const queryClient = useQueryClient();
  const { data: hoogis, isLoading } = useQuery({
    queryKey: [`hoogis${shopId}`],
    queryFn: () => getHoogis(shopId),
  });
  const fakeuser = { isLogin: true, uid: 1 };
  const correctUser = hoogis?.find((hoogi) => {
    return (hoogi.uid = fakeuser.uid);
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
  const modalOpenHandeler = () => {
    if (correctUser) return alert("이미 작성하셨어요");
    setModal(true);
  };

  if (isLoading) {
    return <>로딩중 ..</>;
  }
  let DoneHoogis = {
    맛1: 0,
    맛2: 0,
    맛3: 0,
    가격1: 0,
    가격2: 0,
    가격3: 0,
    위생1: 0,
    위생2: 0,
    위생3: 0,
    서비스1: 0,
    서비스2: 0,
    서비스3: 0,
  };
  hoogis?.forEach((hoogi) => {
    switch (hoogi.가격) {
      case "1":
        DoneHoogis.가격1 += 1;
        break;
      case "2":
        DoneHoogis.가격2 += 1;
        break;
      case "3":
        DoneHoogis.가격3 += 1;
        break;
      default:
        console.log("Unknown 가격.");
    }
    switch (hoogi.맛) {
      case "1":
        DoneHoogis.맛1 += 1;
        break;
      case "2":
        DoneHoogis.맛2 += 1;
        break;
      case "3":
        DoneHoogis.맛3 += 1;
        break;
      default:
        console.log("Unknown 맛.");
    }
    switch (hoogi.위생) {
      case "1":
        DoneHoogis.위생1 += 1;
        break;
      case "2":
        DoneHoogis.위생2 += 1;
        break;
      case "3":
        DoneHoogis.위생3 += 1;
        break;
      default:
        console.log("Unknown 위생.");
    }
    switch (hoogi.서비스) {
      case "1":
        DoneHoogis.서비스1 += 1;
        break;
      case "2":
        DoneHoogis.서비스2 += 1;
        break;
      case "3":
        DoneHoogis.서비스3 += 1;
        break;
      default:
        console.log("Unknown 서비스.");
    }
  });

  const tagCSS =
    "w-10/12 h-[30px] rounded-full bg-white mt-1 flex justify-between px-5";

  return (
    <>
      {" "}
      <div className="bg-cyan-200 h-[600px] w-[900px] mb-[100px] flex flex-col justify-start items-center justify-start  ">
        <div className="bg-pink-200 w-10/12 flex justify-between ">
          <div>
            {hoogis?.map((hoogi: typeOfHoogi) => {
              hoogi.맛;
              return (
                <div key={nanoid()} className="flex">
                  <>{hoogi.uid}님 후기 감사합니다.</>
                  <button
                    onClick={() => deleteHandler(hoogi.id)}
                    className="bg-green-500 rounded-full"
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={modalOpenHandeler}
            className="bg-red-500 w-[80px] h-[50px] rounded-full"
          >
            리뷰 작성하기
          </button>
        </div>

        <div className="w-[800px] bg-yellow-500 flex flex-col ml-[200px] mx-10">
          <h2>가격은 어떤가요?</h2>
          <div className={tagCSS}>
            <p>👍 저렴해요 </p> <p>{DoneHoogis.가격1} </p>{" "}
          </div>
          <div className={tagCSS}>
            <p>😎 괜찮아요 </p> <p>{DoneHoogis.가격2} </p>
          </div>
          <div className={tagCSS}>
            <p>💳 가격이 달라요 </p>
            <p>{DoneHoogis.가격3} </p>{" "}
          </div>
          <h2>맛있었나요?</h2>
          <div className={tagCSS}>
            <p>😋 또 가고싶어요</p> <p>{DoneHoogis.맛1} </p>
          </div>
          <div className={tagCSS}>
            <p>🍽️ 괜찮아요 </p> <p>{DoneHoogis.맛2} </p>{" "}
          </div>
          <div className={tagCSS}>
            <p>🤔 아쉬워요 </p> <p>{DoneHoogis.맛3} </p>
          </div>
          <h2>서비스는 좋았나요?</h2>
          <div className={tagCSS}>
            <p>💖 친절해요 </p> <p>{DoneHoogis.서비스1}</p>{" "}
          </div>
          <div className={tagCSS}>
            <p>👨‍🍳 괜찮아요 </p> <p>{DoneHoogis.서비스2}</p>
          </div>
          <div className={tagCSS}>
            <p>😢 아쉬워요 </p> <p>{DoneHoogis.서비스3}</p>
          </div>
          <h2>위생은 청결했나요?</h2>
          <div className={tagCSS}>
            <p>✨ 깨끗해요 </p> <p>{DoneHoogis.위생1} </p>{" "}
          </div>
          <div className={tagCSS}>
            <p>💦 괜찮아요 </p> <p>{DoneHoogis.위생2} </p>{" "}
          </div>
          <div className={tagCSS}>
            <p>😨 아쉬워요 </p> <p>{DoneHoogis.위생3} </p>{" "}
          </div>
        </div>
      </div>
      {modal && <PostModal setModal={setModal} />}
    </>
  );
}
