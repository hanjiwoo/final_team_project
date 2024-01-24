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

export default function SearchForm() {
  const dispatch = useDispatch();
  const shops = useSelector((state: RootState) => state.allShops);
  // const [shops, setshops] = useState<typeOfShop[]>();
  const [form, setForm] = useState({ sido: "", sigoon: "", upzong: "" });
  const { sido, sigoon, upzong } = form;

  const onchangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setForm({ ...form, [name]: value });
    // console.log(form, "타겟을 확인해 봅시다.");
  };

  const getGoodShop = async () => {
    const resp = await fetch(
      `https://api.odcloud.kr/api/3045247/v1/uddi:00389e44-9981-41c5-81b9-c31008cd0210?page=1&perPage=3000&serviceKey=${process.env.NEXT_PUBLIC_URL}`
    );
    const data = await resp.json();
    return data.data;
  };

  useEffect(() => {
    let data = getGoodShop().then((res: typeOfShop[]) => {
      const filteredRes = res.filter((shop) => {
        return (
          shop.업종.slice(0, 2) !== "기타" &&
          shop.업종.slice(0, 2) !== "이미" &&
          shop.업종.slice(0, 2) !== "목욕" &&
          shop.업종.slice(0, 2) !== "세탁"
        );
      });
      dispatch(getAllShops(filteredRes));
    });
    // setshops(data)
    // console.log(datas, "데이타스");
  }, []);
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!sido || !sigoon || !upzong) {
      alert("검색 제대로하시라구요 예???!? ");
      return setForm({ sido: "", sigoon: "", upzong: "" });
    }
    let filteredShops = shops?.filter((shop) => {
      if (
        shop.시군 &&
        form.sigoon &&
        shop.시도 &&
        form.sido &&
        form.upzong &&
        shop.업종
      ) {
        return (
          shop.시군.substring(0, 2) === form.sigoon.substring(0, 2) &&
          shop.시도.substring(0, 2) === form.sido.substring(0, 2) &&
          shop.업종.substring(0, 2) === form.upzong.substring(0, 2)
        );
      }
    });
    if (!filteredShops[0]) return alert("검색결과가 없어요");
    dispatch(getShops(filteredShops));
    alert("검색완료");
    // setForm({ sido: "", sigoon: "", upzong: "" });
  };

  // console.log(shops, " 샵스");
  if (!shops) return <>로딩중...</>;
  return (
    <div className="w-full flex justify-center items-center px-[100px] py-[40px]">
      <div className="w-[1080px] h-[48px] flex justify-center items-center gap-[16px] rounded-xl">
        {/* {shops[0].업종} */}

        <select
          name="sido"
          onChange={onchangeHandler}
          value={form.sido}
          className="h-full border-[1px] border-[#7A7A7A] rounded-lg text-center w-[244px] text-[#999] bg-[]"
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
        <SigoonOptions
          name="sigoon"
          onChange={onchangeHandler}
          value={form.sigoon}
          sido={form.sido}
        />
        {/* </select> */}
        <select
          name="upzong"
          onChange={onchangeHandler}
          value={form.upzong}
          className="h-full border-[1px] border-[#7A7A7A] rounded-lg text-center w-[244px] text-[#999]"
        >
          <option id="none">업종</option>
          <option>한식</option>
          <option>일식</option>
          <option>양식</option>
          <option>중식</option>
        </select>
        <button
          className="bg-[#FF8145] text-[#fff] h-full py-[14px] px-[26px] rounded-[8px] font-[500]"
          onClick={onClickHandler}
        >
          검색하기
        </button>
        {/* <NowLocationBtn shops={shops} /> */}
      </div>
    </div>
  );
}
