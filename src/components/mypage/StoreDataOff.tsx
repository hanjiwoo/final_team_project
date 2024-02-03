"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import storeMainIcon from "../../app/assets/images/icon/SFIcon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useQuery } from "@tanstack/react-query";
import { getThumbs } from "../home/Fns";
import ShopCard from "../home/ShopCard";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import right from "../../app/assets/images/icon/myRight.png";

export default function StoreDataOff() {
  const user = useSelector((state: RootState) => state.login);
  const shops = useSelector((state: RootState) => state.allShops);
  const { displayName, email, uid, photoURL } = user;
  const router = useRouter();
  const { data: thumbs, isLoading } = useQuery({
    queryKey: [`thumbs`],
    queryFn: getThumbs
  });

  const myShops = thumbs
    ?.filter((thumb) => {
      return thumb.uid === uid;
    })
    .map((thumb) => {
      return shops.find((shop) => {
        return shop.연락처 === thumb.shopId;
      });
    });

  useEffect(() => {
    if (!shops[0] || !user.isLogin) {
      router.push("/");
    }
  }, []);

  return (
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
          <Image src={right} alt="right" className="w-[18px] h-[18px]" />
          <span className="text-[14px] leading-[20px] text-[#7A7A7A]">매장 모음</span>
        </div>
        <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px] max-sm:mb-[32px]">
          매장 모음
        </h1>
        {!myShops && (
          <section className="w-full flex flex-col justify-center items-center gap-[16px] pt-[80px] pb-[80px]">
            <Image src={storeMainIcon} alt="mainIcon" className="w-[48px] h-[48px]" />
            <span className="text-center text-neutral-400 text-base font-medium leading-normal">
              저장된 모음이 따로 없습니다
              <br />
              관심있는 매장을 저장해주세요 :)
            </span>
          </section>
        )}
        <div className="block max-sm:hidden justify-center items-center">
          <section className="gird gird-col-3 w-full">
            {myShops?.map((shop) => {
              if (shop) {
                return (
                  <React.Fragment key={nanoid()}>
                    <ShopCard shop={shop} />
                  </React.Fragment>
                );
              }
            })}
          </section>
        </div>
        <div className="hidden max-sm:block w-[360px]">
          <section className="flex w-[390px] overflow-x-scroll">
            {myShops?.map((shop) => {
              if (shop) {
                return (
                  <React.Fragment key={nanoid()}>
                    <div className="w-full">
                      <ShopCard shop={shop} />
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
