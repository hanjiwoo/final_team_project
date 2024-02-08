"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "@/redux/modules/shopsSlice";
import { typeOfShop } from "@/app/assets/types/types";
import NowLocationBtn from "./NowLocationBtn";
import SigoonOptions from "./SigoonOptions";
import { RootState } from "@/redux/config/configStore";
import { getAllShops } from "@/redux/modules/allShops";
import Image from "next/image";
import down from "../../app/assets/images/icon/down.png";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moeumLoading from "../../../src/app/assets/images/moeumLoading.gif";
import { useQuery } from "@tanstack/react-query";
import { getGoodShop } from "./QueryFn";
import { useSession } from "next-auth/react";

export default function SearchForm() {
  const dispatch = useDispatch();
  // const shops = useSelector((state: RootState) => state.allShops);
  // const [shops, setshops] = useState<typeOfShop[]>();
  const [form, setForm] = useState({ sido: "", sigoon: "", upzong: "" });
  const { sido, sigoon, upzong } = form;

  const onchangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setForm({ ...form, [name]: value });
    // console.log(form, "타겟을 확인해 봅시다.");
  };

  const { data: shops, isLoading } = useQuery({
    queryKey: ["allshops"],
    queryFn: () => {
      return getGoodShop().then((res: typeOfShop[]) => {
        const filteredRes = res.filter((shop) => {
          return (
            shop.업종.slice(0, 2) !== "기타" &&
            shop.업종.slice(0, 2) !== "이미" &&
            shop.업종.slice(0, 2) !== "목욕" &&
            shop.업종.slice(0, 2) !== "세탁"
          );
        });
        dispatch(getAllShops(filteredRes));
        return filteredRes;
      });
    }
  });

  // useEffect(() => {
  // const { data: session } = useSession();
  // const userEmail = session?.user?.email || "";
  // console.log(userEmail, "들어있나?");
  // }, []);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!sido || !sigoon || !upzong) {
      // toast.error("시도 시군 업종을 선택해주세요");
      toast.error("모든 옵션을 선택해주세요.", {
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
      return; /* setForm({ sido: "", sigoon: "", upzong: "" }); */
    }
    let filteredShops = shops?.filter((shop) => {
      if (shop.시군 && form.sigoon && shop.시도 && form.sido && form.upzong && shop.업종) {
        return (
          shop.시군.substring(0, 2) === form.sigoon.substring(0, 2) &&
          shop.시도.substring(0, 2) === form.sido.substring(0, 2) &&
          shop.업종.substring(0, 2) === form.upzong.substring(0, 2)
        );
      }
    });
    if (!filteredShops?.[0])
      return toast.warning("검색결과가 없어요.", {
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
    dispatch(getShops(filteredShops));
    toast.success("검색된 모음을 알려드릴게요.", {
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
    // setForm({ sido: "", sigoon: "", upzong: "" });
  };

  // console.log(shops, " 샵스");
  if (!shops)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Image src={moeumLoading} alt="loading" className="w-[300px] h-[300px]" />
      </div>
    );
  if (isLoading) {
    return <>로딩중</>;
  }
  return (
    <div className="w-full max-md:px-[20px] md:w-[712px] max-md:my-[24px] gap-[12px] md:flex lg:w-[712px] xl:w-[1080px] md:my-[40px]">
      <div className="w-full h-[48px] flex gap-4 rounded-xl">
        {/* {shops[0].업종} */}
        <select
          name="sido"
          onChange={onchangeHandler}
          value={form.sido}
          className="h-full w-full border-[1px] border-[#C2C2C2] rounded-lg  text-[#999] py-[14px] justify-start flex px-[12px]"
        >
          <option id="none">광역시/도</option>

          <option id="1">서울시</option>
          <option id="10">부산광역시</option>
          <option id="7">대구광역시</option>
          <option id="13">인천광역시</option>
          <option id="6">광주광역시</option>
          <option id="8">대전광역시</option>
          <option id="12">울산광역시</option>
          <option id="11">세종시</option>
          <option id="3">경기도</option>
          <option id="2">강원도</option>
          <option id="18">충청북도</option>
          <option id="17">충청남도</option>
          <option id="15">전라북도</option>
          <option id="14">전라남도</option>
          <option id="5">경상북도</option>
          <option id="4">경상남도</option>
          <option id="16">제주도</option>
        </select>

        {/* <select name="upzong" onChange={onchangeHandler} value={form.upzong}> */}
        <SigoonOptions name="sigoon" onChange={onchangeHandler} value={form.sigoon} sido={form.sido} />
        {/* </select> */}
        <select
          name="upzong"
          onChange={onchangeHandler}
          value={form.upzong}
          className="h-full w-full border-[1px] border-[#C2C2C2] rounded-lg  text-[#999] py-[14px] justify-start flex px-[12px]"
        >
          <option id="none">업종</option>
          <option>한식</option>
          <option>일식</option>
          <option>양식</option>
          <option>중식</option>
          <option>기타</option>
        </select>
        {/* <NowLocationBtn shops={shops} /> */}
      </div>
      <section className="w-full flex justify-center items-center md:max-w-[110px]">
        <button
          className="bg-[#FF8145] hover:bg-[#E5743E] text-[#fff] h-[48px] w-full py-[14px] rounded-[8px] font-[500] md:max-w-[110px] max-md:mt-[12px]"
          onClick={onClickHandler}
        >
          검색하기
        </button>
      </section>
    </div>
  );
}
