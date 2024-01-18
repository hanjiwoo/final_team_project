"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { deleteHoogi, getHoogis } from "./queryFns";
import { typeOfHoogi } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import PostModal from "./PostModal";
import Image from "next/image";
import pencilIcon from "../../app/assets/images/icon/write_icon.png";
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
      // console.log("Unknown 가격.");
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
      // console.log("Unknown 맛.");
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
      // console.log("Unknown 위생.");
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
      // console.log("Unknown 서비스.");
    }
  });

  const tagCSS =
    "w-full h-[48px] rounded-[8px] mt-1 flex justify-between items-center px-5 bg-[#FAFAFA]";

  const numberCSS = "text-[#FF8145]";
  const numberCSS = "text-[#FF8145]";

  return (
    <>
      {" "}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center mb-[36px]">
          <span className="w-full text-[20px] font-semibold leading-[28px]">
            해당 매장의 #태그 리뷰를 확인해보세요 :)
          </span>
          <button
            onClick={modalOpenHandeler}
            className="bg-[#FF8145] w-[156px] h-[40px] rounded-[8px] text-[14px] text-[#fff] flex justify-center items-center gap-[8px] px-[12px] py-[8px]"
          >
            <Image
              src={pencilIcon}
              alt="writeReview"
              className="w-[20px] h-[20px]"
            />
            리뷰 작성하기
          </button>
        </div>
        return (
        <>
          {" "}
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center mb-[36px]">
              <span className="w-full text-[20px] font-semibold leading-[28px]">
                해당 매장의 #태그 리뷰를 확인해보세요 :)
              </span>
              <button
                onClick={modalOpenHandeler}
                className="bg-[#FF8145] w-[156px] h-[40px] rounded-[8px] text-[14px] text-[#fff] flex justify-center items-center gap-[8px] px-[12px] py-[8px]"
              >
                <Image
                  src={pencilIcon}
                  alt="writeReview"
                  className="w-[20px] h-[20px]"
                />
                리뷰 작성하기
              </button>
            </div>

            <div className="mb-[16px]">
              {hoogis
                ?.filter((hoogi) => {
                  return (hoogi.uid = fakeuser.uid);
                })
                .map((hoogi: typeOfHoogi) => {
                  hoogi.맛;
                  return (
                    <div key={nanoid()} className="flex gap-[8px]">
                      <>{hoogi.uid}님 후기 감사합니다.</>
                      <button
                        onClick={() => deleteHandler(hoogi.id)}
                        className="text-[#FF8145] underline"
                      >
                        후기삭제
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="mb-[16px]">
              {hoogis
                ?.filter((hoogi) => {
                  return (hoogi.uid = fakeuser.uid);
                })
                .map((hoogi: typeOfHoogi) => {
                  hoogi.맛;
                  return (
                    <div key={nanoid()} className="flex gap-[8px]">
                      <>{hoogi.uid}님 후기 감사합니다.</>
                      <button
                        onClick={() => deleteHandler(hoogi.id)}
                        className="text-[#FF8145] underline"
                      >
                        후기삭제
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-[32px] mb-[100px]">
              <form className="w-full">
                <h2 className="text-[16px] font-semibold leading-[24px] mb-[20px]">
                  가격은 어떤가요?
                </h2>
                <div className="flex gap-[12px] flex-col">
                  <div className={tagCSS}>
                    <p>👍 저렴해요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.가격1} </p>{" "}
                  </div>
                  <div className={tagCSS}>
                    <p>😎 괜찮아요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.가격2} </p>
                  </div>
                  <div className={tagCSS}>
                    <p>💳 가격이 달라요 </p>
                    <p className={numberCSS}>{DoneHoogis.가격3} </p>{" "}
                  </div>
                </div>
              </form>
              <form className="w-full">
                <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">
                  맛있었나요?
                </h2>
                <div className="flex gap-[12px] flex-col">
                  <div className={tagCSS}>
                    <p>😋 또 가고싶어요</p>{" "}
                    <p className={numberCSS}>{DoneHoogis.맛1} </p>
                  </div>
                  <div className={tagCSS}>
                    <p>🍽️ 괜찮아요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.맛2} </p>{" "}
                  </div>
                  <div className={tagCSS}>
                    <p>🤔 아쉬워요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.맛3} </p>
                  </div>
                </div>
              </form>
              <form className="w-full">
                <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">
                  서비스는 좋았나요?
                </h2>
                <div className="flex gap-[12px] flex-col">
                  <div className={tagCSS}>
                    <p>💖 친절해요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.서비스1}</p>{" "}
                  </div>
                  <div className={tagCSS}>
                    <p>👨‍🍳 괜찮아요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.서비스2}</p>
                  </div>
                  <div className={tagCSS}>
                    <p>😢 아쉬워요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.서비스3}</p>
                  </div>
                </div>
              </form>
              <form className="w-full">
                <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">
                  위생은 청결했나요?
                </h2>
                <div className="flex gap-[12px] flex-col">
                  <div className={tagCSS}>
                    <p>✨ 깨끗해요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.위생1} </p>{" "}
                  </div>
                  <div className={tagCSS}>
                    <p>💦 괜찮아요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.위생2} </p>{" "}
                  </div>
                  <div className={tagCSS}>
                    <p>😨 아쉬워요 </p>{" "}
                    <p className={numberCSS}>{DoneHoogis.위생3} </p>{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {modal && <PostModal setModal={setModal} />}
        </>
        );
        <div className="w-full flex flex-col justify-center items-center gap-[32px] mb-[100px]">
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px] mb-[20px]">
              가격은 어떤가요?
            </h2>
            <div className="flex gap-[12px] flex-col">
              <div className={tagCSS}>
                <p>👍 저렴해요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.가격1} </p>{" "}
              </div>
              <div className={tagCSS}>
                <p>😎 괜찮아요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.가격2} </p>
              </div>
              <div className={tagCSS}>
                <p>💳 가격이 달라요 </p>
                <p className={numberCSS}>{DoneHoogis.가격3} </p>{" "}
              </div>
            </div>
          </form>
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">
              맛있었나요?
            </h2>
            <div className="flex gap-[12px] flex-col">
              <div className={tagCSS}>
                <p>😋 또 가고싶어요</p>{" "}
                <p className={numberCSS}>{DoneHoogis.맛1} </p>
              </div>
              <div className={tagCSS}>
                <p>🍽️ 괜찮아요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.맛2} </p>{" "}
              </div>
              <div className={tagCSS}>
                <p>🤔 아쉬워요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.맛3} </p>
              </div>
            </div>
          </form>
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">
              서비스는 좋았나요?
            </h2>
            <div className="flex gap-[12px] flex-col">
              <div className={tagCSS}>
                <p>💖 친절해요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.서비스1}</p>{" "}
              </div>
              <div className={tagCSS}>
                <p>👨‍🍳 괜찮아요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.서비스2}</p>
              </div>
              <div className={tagCSS}>
                <p>😢 아쉬워요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.서비스3}</p>
              </div>
            </div>
          </form>
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">
              위생은 청결했나요?
            </h2>
            <div className="flex gap-[12px] flex-col">
              <div className={tagCSS}>
                <p>✨ 깨끗해요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.위생1} </p>{" "}
              </div>
              <div className={tagCSS}>
                <p>💦 괜찮아요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.위생2} </p>{" "}
              </div>
              <div className={tagCSS}>
                <p>😨 아쉬워요 </p>{" "}
                <p className={numberCSS}>{DoneHoogis.위생3} </p>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
      {modal && <PostModal setModal={setModal} />}
    </>
  );
}
