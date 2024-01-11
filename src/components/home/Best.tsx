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
    <div className="container px-5 py-10 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
          이달의 Best 매장 모-음
        </h1>
      </div>

      <div className="flex flex-wrap -m-4">
        {bestList.map((item) => {
          return (
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src={item.photo}
                  alt="photo"
                />

                <div
                  className="p-6 hover:bg-orange-400 hover:text-white
                         transition duration-300 ease-in"
                >
                  {item.title}
                </div>
                <div className="text-base font-medium text-indigo-400 mb-1">
                  {item.추천해요}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
