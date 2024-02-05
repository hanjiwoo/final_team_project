"use client";
import React, { Fragment, useState } from "react";
import AssessBtn from "./AssessBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { addHoogi } from "./queryFns";
import Image from "next/image";
import pencilIcon from "../../app/assets/images/icon/write_icon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import ShopCard2 from "../map/ShopCard2";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type assessment = {
  title: string;
  type: string;
  one: string;
  two: string;
  three: string;
  four: string;
};
const assessmentList = [
  {
    title: "가격은 어떤가요?",
    type: "가격",
    one: "👍 저렴해요",
    two: "😎 괜찮아요",
    three: "💳 가격이 달라요",
    four: "존마탱"
  },
  {
    title: "맛있었나요?",
    type: "맛",
    one: "😋 또 가고싶어요",
    two: "🍽️ 괜찮아요",
    three: "🤔 아쉬워요",
    four: "존마탱"
  },
  {
    title: "서비스는 좋았나요?",
    type: "서비스",
    one: "💖 친절해요",
    two: "👨‍🍳 괜찮아요",
    three: "😢 아쉬워요",
    four: "존마탱"
  },
  {
    title: "위생은 청결했나요?",
    type: "위생",
    one: "✨ 깨끗해요",
    two: "💦 괜찮아요",
    three: "😨 아쉬워요",
    four: "존마탱"
  }
];

// const fakeUser = {
// 	isLogin: true,
// 	uid: 1,
// 	name: "han",
// };
// const { uid } = fakeUser;
export default function Hoogi({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { isLogin, uid, displayName } = useSelector((state: RootState) => state.login);
  const shop = useSelector((state: RootState) => state.detailShop);
  // const [range, setRange] = useState("0");
  // const [activeId, setActiveId] = useState("");
  // const [face, setFace] = useState("");
  const [form, setForm] = useState({
    맛: "",
    가격: "",
    서비스: "",
    위생: ""
  });
  // console.log(form);
  const { 맛, 가격, 서비스, 위생 } = form;
  const { id: shopId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addHoogi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`hoogis${shopId}`] });
    }
  });

  // const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRange(e.target.value);
  // };

  // const onclickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   // if (e.currentTarget === e.target) return;
  //   //  setActiveHoogi(e.target.id)
  //   // console.log(e.currentTarget.innerHTML);
  //   setActiveId(e.currentTarget.id);
  // };
  // const faceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.innerHTML === "이모티콘") return alert("no");

  //   setFace(e.target.value);
  //   // console.log(e.target, "이모티콘");
  // };
  const submitHandler = () => {
    // console.log(uid, shopId, 맛, 가격, 위생, 서비스, range, face);
    if (
      !맛 ||
      !가격 ||
      !위생 ||
      !서비스
      // range === "0" ||
      // face === "이모티콘"
    )
      // return toast.error("후기 선택을 전부 해주세요");
      return toast.error("후기를 모두 선택해주세요.", {
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

    mutateToAdd({ uid, displayName, shopId, 맛, 가격, 위생, 서비스 });
    // setFace("");
    /* setForm({
      맛: "",
      가격: "",
      서비스: "",
      위생: "",
    }); */
    // setRange("0");
    toast.success("리뷰가 등록되었어요.", {
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
    setModal(false);

    // console.log(맛, 가격, 위생, 서비스, range, face);
  };
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="pointer-events-none flex jutify-start w-full max-sm:hidden">
          <ShopCard2 shop={shop} type="no" />
        </div>
        <div className="flex flex-col w-full gap-[32px]">
          {/* <section className="flex justify-between">
					<h1 className="text-2xl">해당 매장의 #태그 리뷰를 확인해보세요 :)</h1>
				</section> */}

          {assessmentList.map((item: assessment) => {
            return (
              <React.Fragment key={item.title}>
                <AssessBtn item={item} form={form} setForm={setForm} />
              </React.Fragment>
            );
          })}
        </div>
        <div>
          <button
            className="bg-[#FF8145] w-full  h-[48px] mt-[32px] rounded-[8px] text-[14px] text-[#fff] leading-[20px] flex justify-center items-center gap-[12px] py-[8px] px-[16px]"
            onClick={submitHandler}
          >
            <Image src={pencilIcon} alt="reviewWrite" className="w-[20px] h-[20px]" />
            리뷰 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
