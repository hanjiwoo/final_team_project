"use client";
import React from "react";
import Image from "next/image";
import heartOff from "../../app/assets/images/icon/heart_off.png";
import spoonFork from "../../app/assets/images/icon/spoon_fork.png";
import place from "../../app/assets/images/icon/place.png";

export default function StoreDataOn() {
  return (
    <div className="flex justify-center items-center w-full mt-[60px] mb-[60px]">
      <div className="w-[880px] flex justify-center items-center flex-col">
        <h1 className="text-[28px] font-semibold text-[#212121] leading-[36px] mb-[60px] w-full">
          매장 모음
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          <form className="p-5 bg-white rounded-2xl border border-zinc-300 flex-col justify-center items-center gap-6 inline-flex">
            <div className="flex gap-[24px] flex-col justify-center">
              <div className="w-[240px] h-[160px] bg-[#F1F1F1] border border-zinc-300 rounded-lg" />
              <div className="flex flex-row justify-between items-center ">
                <span className="text-center text-neutral-800 text-lg font-semibold leading-relaxed text">
                  매장이름
                </span>
                <Image
                  src={heartOff}
                  alt="heartOff"
                  className="w-[24px] h-[24px]"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] ">
                  <Image
                    src={spoonFork}
                    alt="spoonFork"
                    className="w-[18px] h-[18px]"
                  />
                  <span>한식</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <Image
                    src={place}
                    alt="place"
                    className="w-[18px] h-[18px]"
                  />
                  <span>경기도 의정부시 경의로 66</span>
                </div>
              </div>
            </div>
          </form>
          <form className="p-5 bg-white rounded-2xl border border-zinc-300 flex-col justify-center items-center gap-6 inline-flex ">
            <div className="flex gap-[24px] flex-col justify-center">
              <div className="w-[240px] h-[160px] bg-[#F1F1F1] border border-zinc-300 rounded-lg" />
              <div className="flex flex-row justify-between items-center">
                <span className="text-center text-neutral-800 text-lg font-semibold leading-relaxed text">
                  매장이름
                </span>
                <Image
                  src={heartOff}
                  alt="heartOff"
                  className="w-[24px] h-[24px]"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] ">
                  <Image
                    src={spoonFork}
                    alt="spoonFork"
                    className="w-[18px] h-[18px]"
                  />
                  <span>한식</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <Image
                    src={place}
                    alt="place"
                    className="w-[18px] h-[18px]"
                  />
                  <span>경기도 의정부시 경의로 66</span>
                </div>
              </div>
            </div>
          </form>
          <form className="p-5 bg-white rounded-2xl border border-zinc-300 flex-col justify-center items-center gap-6 inline-flex ">
            <div className="flex gap-[24px] flex-col justify-center">
              <div className="w-[240px] h-[160px] bg-[#F1F1F1] border border-zinc-300 rounded-lg" />
              <div className="flex flex-row justify-between items-center">
                <span className="text-center text-neutral-800 text-lg font-semibold leading-relaxed text">
                  매장이름
                </span>
                <Image
                  src={heartOff}
                  alt="heartOff"
                  className="w-[24px] h-[24px]"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] ">
                  <Image
                    src={spoonFork}
                    alt="spoonFork"
                    className="w-[18px] h-[18px]"
                  />
                  <span>한식</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <Image
                    src={place}
                    alt="place"
                    className="w-[18px] h-[18px]"
                  />
                  <span>경기도 의정부시 경의로 66</span>
                </div>
              </div>
            </div>
          </form>
          <form className="p-5 bg-white rounded-2xl border border-zinc-300 flex-col justify-center items-center gap-6 inline-flex ">
            <div className="flex gap-[24px] flex-col justify-center">
              <div className="w-[240px] h-[160px] bg-[#F1F1F1] border border-zinc-300 rounded-lg" />
              <div className="flex flex-row justify-between items-center">
                <span className="text-center text-neutral-800 text-lg font-semibold leading-relaxed text">
                  매장이름
                </span>
                <Image
                  src={heartOff}
                  alt="heartOff"
                  className="w-[24px] h-[24px]"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] ">
                  <Image
                    src={spoonFork}
                    alt="spoonFork"
                    className="w-[18px] h-[18px]"
                  />
                  <span>한식</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <Image
                    src={place}
                    alt="place"
                    className="w-[18px] h-[18px]"
                  />
                  <span>경기도 의정부시 경의로 66</span>
                </div>
              </div>
            </div>
          </form>
          <form className="p-5 bg-white rounded-2xl border border-zinc-300 flex-col justify-center items-center gap-6 inline-flex ">
            <div className="flex gap-[24px] flex-col justify-center">
              <div className="w-[240px] h-[160px] bg-[#F1F1F1] border border-zinc-300 rounded-lg" />
              <div className="flex flex-row justify-between items-center">
                <span className="text-center text-neutral-800 text-lg font-semibold leading-relaxed text">
                  매장이름
                </span>
                <Image
                  src={heartOff}
                  alt="heartOff"
                  className="w-[24px] h-[24px]"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] ">
                  <Image
                    src={spoonFork}
                    alt="spoonFork"
                    className="w-[18px] h-[18px]"
                  />
                  <span>한식</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <Image
                    src={place}
                    alt="place"
                    className="w-[18px] h-[18px]"
                  />
                  <span>경기도 의정부시 경의로 66</span>
                </div>
              </div>
            </div>
          </form>
          <form className="p-5 bg-white rounded-2xl border border-zinc-300 flex-col justify-center items-center gap-6 inline-flex ">
            <div className="flex gap-[24px] flex-col justify-center">
              <div className="w-[240px] h-[160px] bg-[#F1F1F1] border border-zinc-300 rounded-lg" />
              <div className="flex flex-row justify-between items-center">
                <span className="text-center text-neutral-800 text-lg font-semibold leading-relaxed text">
                  매장이름
                </span>
                <Image
                  src={heartOff}
                  alt="heartOff"
                  className="w-[24px] h-[24px]"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center gap-[8px] ">
                  <Image
                    src={spoonFork}
                    alt="spoonFork"
                    className="w-[18px] h-[18px]"
                  />
                  <span>한식</span>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <Image
                    src={place}
                    alt="place"
                    className="w-[18px] h-[18px]"
                  />
                  <span>경기도 의정부시 경의로 66</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
