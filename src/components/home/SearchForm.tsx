"use client";
import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getShops } from "@/redux/modules/shopSlice";
import { typeOfShop } from "@/app/assets/types/types";

export default function SearchForm() {
  const dispatch = useDispatch();
  const [shops, setshops] = useState<typeOfShop[]>();
  const [form, setForm] = useState({ sido: "", sigoon: "", upzong: "" });
  const { sido, sigoon, upzong } = form;
  const onchangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setForm({ ...form, [name]: value });
    // console.log(form);
  };

  const getGoodShop = async () => {
    const { data } = await axios.get(
      `https://api.odcloud.kr/api/3045247/v1/uddi:00389e44-9981-41c5-81b9-c31008cd0210?page=1&perPage=100&serviceKey=${process.env.NEXT_PUBLIC_URL}`
    );
    // console.log(data.data, "데이타다");
    // setshops(data.data);
    return data.data;
  };

  useEffect(() => {
    let data = getGoodShop().then((res) => {
      setshops(res);
      // console.log(res, "이거리스판스야");
    });
    // setshops(data)
    // console.log(datas, "데이타스");
  }, []);
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!sido || !sigoon || !upzong)
      return alert("검색 제대로하시라구요 예???!? ");

    let filteredShops = shops?.filter((shop) => {
      return (
        shop.시군 === form.sigoon &&
        shop.시도 === form.sido &&
        shop.업종 === form.upzong
      );
    });
    dispatch(getShops(filteredShops));
    // console.log(filteredShops, "필터 된 가게");

    setForm({ sido: "", sigoon: "", upzong: "" });
  };
  // console.log(shops, " 샵스");
  if (!shops) return <>로딩중...</>;
  return (
    <div className="bg-red-100 w-[800px] h-[100px] flex justify-center items-center gap-5">
      {/* {shops[0].업종} */}
      <select name="sido" onChange={onchangeHandler} value={form.sido}>
        <option id="none">시도을 선택합쇼</option>
        <option>경기도</option>
        <option>서울특별시</option>
        <option>서울특별시</option>
        <option>서울특별시</option>
      </select>
      <select name="sigoon" onChange={onchangeHandler} value={form.sigoon}>
        <option id="none">시군을 선택합쇼</option>
        <option>의정부시</option>
        <option>강동구</option>
        <option>강남구</option>
        <option>강북구</option>
      </select>
      <select name="upzong" onChange={onchangeHandler} value={form.upzong}>
        <option id="none">업종을 선택합쇼</option>
        <option>한식_일반</option>
        <option>일식</option>
        <option>양식</option>
        <option>중식</option>
      </select>
      <button className="bg-green-100" onClick={onClickHandler}>
        찾아보기
      </button>
    </div>
  );
}
