import React from "react";
import dummy from "../../app/assets/images/피카츄.jpg";
import Image from "next/image";

const photo1 = dummy;
const photo2 = dummy;
const photo3 = dummy;
export const bestList = [
  {
    id: "1",
    title: "매장 이름",
    photo: photo1,
    추천해요: "여기는 따봉갯수",
  },
  {
    id: "2",
    title: "매장 이름",
    photo: photo2,
    추천해요: "여기는 따봉갯수",
  },
  {
    id: "3",
    title: "매장 이름",
    photo: photo3,
    추천해요: "여기는 따봉갯수",
  },
];

export default function Best() {
  return (
    <>
      <div>이달의 Best 매장 모-음</div>
      <div className="flex items-center space-x-2 text-base">
        {bestList.map((item) => {
          return (
            <>
              <div>{item.title}</div>
              <div>{item.추천해요}</div>
              <Image src={item.photo} alt="photo" />
            </>
          );
        })}
      </div>
    </>
  );
}
