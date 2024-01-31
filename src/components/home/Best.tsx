"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useQuery } from "@tanstack/react-query";
import { getThumbs } from "./Fns";
import { typeOfShop } from "@/app/assets/types/types";
import { nanoid } from "nanoid";
import ShopCard2 from "./ShopCard2";

export default function Best() {
  const shops = useSelector((state: RootState) => state.allShops);
  const [top3Shops, setTop3Shops] = useState<(typeOfShop | undefined)[]>();
  const { data: thumbs, isLoading } = useQuery({
    queryKey: [`thumbs`],
    queryFn: getThumbs
  });

  useEffect(() => {
    const uniqueArray = thumbs?.map((item) => {
      return item.shopId;
    });
    // console.log(uniqueArray, "요거는?");
    const countThumbs: Record<string, number> = {};
    uniqueArray?.forEach((element) => {
      const key = String(element);
      countThumbs[key] = (countThumbs[key] || 0) + 1;
    });
    const entries = Object.entries(countThumbs);
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
    const top3 = sortedEntries.slice(0, 3);
    // console.log(top3, "탑3");
    const foundTop3 = top3.map((shopid) => {
      return shops.find((shop) => {
        return shop.연락처 === shopid[0];
      });
    });
    // console.log(foundTop3, "과연");
    if (foundTop3 !== undefined) {
      setTop3Shops(foundTop3);
    }
  }, [thumbs, shops]);
  return (
    <div className="container px-[20px] mx-auto">
      {/* <div style={{ pointerEvents: "none", width: "400px", height: "300px" }}>
        <Roadview
          position={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
            radius: 50,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
        />
      </div> */}
      <div className="my-[40px]">
        <div className="text-center mb-12">
          <h1 className="text-[28px] leading-[36px] text-[#212121] font-semibold mb-[12px]">이달의 Best 매장 모음</h1>
          <span className="text-[18px] leading-[20px] font-[#5c5c5c]">인기 매장을 지금 바로 확인해보세요 :)</span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex w-full gap-[24px] max-lg:overflow-x-scroll max-lg:justify-start max-lg:gap-[20px] justify-center max-sm:scrollbar-hide ">
            {top3Shops?.map((shop) => {
              return <React.Fragment key={nanoid()}>{shop && <ShopCard2 shop={shop} />}</React.Fragment>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
