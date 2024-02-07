"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pencilIcon from "../../app/assets/images/icon/pencilIcon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useQuery } from "@tanstack/react-query";
import { getThumbs } from "../home/Fns";
import { Daetgle } from "@/app/assets/types/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/shared/firebase";
import { nanoid } from "nanoid";
import DaetgleCard from "../community/DaetgleCard";
import { useRouter } from "next/navigation";
import right from "../../app/assets/images/icon/myRight.png";

export default function CommentsDataOff() {
  const router = useRouter();
  const { isLogin, uid } = useSelector((state: RootState) => state.login);
  const { data: daetgles, isLoading } = useQuery({
    queryKey: [`daetgle`],
    queryFn: () => {
      const getDaetgles = async () => {
        let data: Daetgle[] = [];
        const response = await getDocs(collection(db, `daetgle`));
        response.forEach((daet) => {
          const daetData = daet.data();
          data.push({ ...daetData, id: daet.id });
        });
        return data;
      };

      return getDaetgles();
    }
  });
  const filterdDaetgles = daetgles?.filter((daetgle) => {
    return daetgle.uid === uid;
  });
  if (!isLogin) {
    return <>로그인하면 볼수 있어용</>;
  }

  return (
    <>
      <div className="flex justify-center items-center w-full mt-[60px] mb-[60px] px-[20px] max-sm:mt-[32px]">
        <div className="w-[880px]">
          <div className="flex flex-row gap-[5px] mb-[40px] max-sm:mb-[32px]">
            <span
              className="text-[14px] leading-[20px] text-[#C2C2C2] cursor-pointer"
              onClick={() => {
                router.push("/mypage");
              }}
            >
              마이 모음
            </span>
            <Image width={100} height={100} src={right} alt="right" className="w-[18px] h-[18px]" />
            <span className="text-[14px] leading-[20px] text-[#7A7A7A]">댓글 모음</span>
          </div>

          <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px] max-sm:mb-[32px]">
            댓글 모음
          </h1>

          <section className="w-full flex flex-col justify-center gap-[16px]">
            {filterdDaetgles?.[0] ? (
              filterdDaetgles?.map((item) => {
                return (
                  <React.Fragment key={nanoid()}>
                    <DaetgleCard item={item} uid={uid} />
                  </React.Fragment>
                );
              })
            ) : (
              <section className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
                <Image width={100} height={100} src={pencilIcon} alt="mainIcon" className="w-[48px] h-[48px]" />
                <span className="text-center text-neutral-400 text-base font-medium leading-normal">
                  작성한 댓글이 따로 없습니다
                  <br />
                  댓글을 작성해주세요 :)
                </span>
              </section>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
