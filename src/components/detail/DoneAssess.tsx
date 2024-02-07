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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import ResultBar from "./ResultBar";
import { toast, ToastContainer, Slide } from "react-toastify";
import moeumLoading from "../../app/assets/images/moeumLoading.gif";
import "react-toastify/dist/ReactToastify.css";
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
    queryFn: () => getHoogis(shopId)
  });
  // const fakeuser = { isLogin: true, uid: 1 };
  const { isLogin, uid } = useSelector((state: RootState) => state.login);
  const correctUser = hoogis?.find((hoogi) => {
    return hoogi.uid === uid;
  });

  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteHoogi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`hoogis${shopId}`] });
    }
  });

  const deleteHandler = (selectedId: string | undefined) => {
    mutateToDelete({ shopId, selectedId });
  };

  const router = useRouter();
  const modalOpenHandeler = () => {
    if (correctUser)
      return toast.error("이미 작성하셨어요.", {
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
    if (!isLogin)
      return toast.error("로그인 후 이용할 수 있어요.", {
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
    setModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Image width={300} height={300} src={moeumLoading} alt="loading" className="w-[300px] h-[300px]" />
      </div>
    );
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
    서비스3: 0
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

  // const tagCSS =
  //   "w-full h-[48px] rounded-[8px] mt-1 flex justify-between items-center  bg-[#FAFAFA] relative overflow-hidden ";
  // const colorBarCSS = "absolute bg-pink-100 h-full w-1/2 ";
  // const numberCSS = "text-[#FF8145]  ";
  // const textCSS =
  //   "absolute px-5 w-full h-full flex items-center justify-between";
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center mb-[36px] max-sm:mb-0">
          <span className="w-full text-[20px] font-semibold leading-[28px]">
            해당 매장의 #태그 리뷰를 확인해보세요 :)
          </span>
          <div className="max-sm:hidden">
            <button
              onClick={modalOpenHandeler}
              className="bg-[#FF8145] w-[156px] h-[40px] rounded-[8px] text-[14px] text-[#fff] flex justify-center items-center gap-[8px] px-[12px] py-[8px] font-[Pretendard]"
            >
              <Image width={100} height={100} src={pencilIcon} alt="writeReview" className="w-[20px] h-[20px]" />
              리뷰 작성하기
            </button>
          </div>
        </div>
        <div className="max-sm:block sm:hidden w-full my-[20px]">
          <button
            onClick={modalOpenHandeler}
            className="bg-[#FF8145] w-full h-[40px] rounded-[8px] text-[14px] text-[#fff] flex justify-center items-center gap-[8px] px-[12px] py-[8px] font-[Pretendard]"
          >
            <Image width={100} height={100} src={pencilIcon} alt="writeReview" className="w-[20px] h-[20px]" />
            리뷰 작성하기
          </button>
        </div>

        <div className="mb-[16px]">
          {/* {hoogis
            ?.filter((hoogi) => {
              return (hoogi.uid = uid);
            })
            .map((hoogi: typeOfHoogi) => {
              hoogi.맛;
              return (
                <div key={nanoid()} className="flex gap-[8px]">
                  <>{hoogi.displayName}님 후기 감사합니다.</>
                  <button
                    onClick={() => deleteHandler(hoogi.id)}
                    className="text-[#FF8145] underline"
                  >
                    후기삭제
                  </button>
                </div>
              );
            })} */}
          {correctUser ? (
            <div className="flex gap-[8px]">
              <>{correctUser?.displayName}님 후기 감사합니다.</>
              <button onClick={() => deleteHandler(correctUser?.id)} className="text-[#FF8145] underline">
                후기삭제
              </button>
            </div>
          ) : (
            <div>처음 방문하셨군요! 후기를 남겨주세요.</div>
          )}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-[32px] mb-[100px]">
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px] mb-[20px]">가격은 어떤가요?</h2>
            <div className="flex gap-[12px] flex-col">
              <ResultBar
                text="👍 저렴해요  "
                number={DoneHoogis.가격1}
                numbers={DoneHoogis.가격1 + DoneHoogis.가격2 + DoneHoogis.가격3}
              />
              <ResultBar
                text="😎 괜찮아요 "
                number={DoneHoogis.가격2}
                numbers={DoneHoogis.가격1 + DoneHoogis.가격2 + DoneHoogis.가격3}
              />
              <ResultBar
                text="💳 가격이 달라요  "
                number={DoneHoogis.가격3}
                numbers={DoneHoogis.가격1 + DoneHoogis.가격2 + DoneHoogis.가격3}
              />
            </div>
          </form>
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">맛있었나요?</h2>
            <div className="flex gap-[12px] flex-col">
              <ResultBar
                text="😋 또 가고싶어요 "
                number={DoneHoogis.맛1}
                numbers={DoneHoogis.맛1 + DoneHoogis.맛2 + DoneHoogis.맛3}
              />
              <ResultBar
                text="🍽️ 괜찮아요 "
                number={DoneHoogis.맛2}
                numbers={DoneHoogis.맛1 + DoneHoogis.맛2 + DoneHoogis.맛3}
              />
              <ResultBar
                text="🤔 아쉬워요  "
                number={DoneHoogis.맛3}
                numbers={DoneHoogis.맛1 + DoneHoogis.맛2 + DoneHoogis.맛3}
              />
            </div>
          </form>
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">서비스는 좋았나요?</h2>
            <div className="flex gap-[12px] flex-col">
              <ResultBar
                text="💖 친절해요 "
                number={DoneHoogis.서비스1}
                numbers={DoneHoogis.서비스1 + DoneHoogis.서비스2 + DoneHoogis.서비스3}
              />
              <ResultBar
                text="👨‍🍳 괜찮아요"
                number={DoneHoogis.서비스2}
                numbers={DoneHoogis.서비스1 + DoneHoogis.서비스2 + DoneHoogis.서비스3}
              />
              <ResultBar
                text="😢 아쉬워요"
                number={DoneHoogis.서비스3}
                numbers={DoneHoogis.서비스1 + DoneHoogis.서비스2 + DoneHoogis.서비스3}
              />
            </div>
          </form>
          <form className="w-full">
            <h2 className="text-[16px] font-semibold leading-[24px]  mb-[20px]">위생은 청결했나요?</h2>
            <div className="flex gap-[12px] flex-col">
              <ResultBar
                text="✨ 깨끗해요"
                number={DoneHoogis.위생1}
                numbers={DoneHoogis.위생1 + DoneHoogis.위생2 + DoneHoogis.위생3}
              />
              <ResultBar
                text="💦 괜찮아요"
                number={DoneHoogis.위생2}
                numbers={DoneHoogis.위생1 + DoneHoogis.위생2 + DoneHoogis.위생3}
              />
              <ResultBar
                text="😨 아쉬워요"
                number={DoneHoogis.위생3}
                numbers={DoneHoogis.위생1 + DoneHoogis.위생2 + DoneHoogis.위생3}
              />
            </div>
          </form>
        </div>
      </div>
      {modal && <PostModal setModal={setModal} />}
    </>
  );
}
