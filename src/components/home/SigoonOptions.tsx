"use client";
import { nanoid } from "nanoid";
import React, { useRef, useState } from "react";

const 서울시 = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구"
];
const 강원도 = [
  "강릉시",
  "고성군",
  "동해시",
  "삼척시",
  "속초시",
  "양구군",
  "양양군",
  "영월군",
  "원주시",
  "인제군",
  "정선군",
  "철원군",
  "춘천시",
  "태백시",
  "평창군",
  "홍천군",
  "화천군",
  "횡성군"
];
const 경기도 = [
  "고양시",
  "과천시",
  "광명시",
  "광주시",
  "구리시",
  "군포시",
  "김포시",
  "남양주시",
  "동두천시",
  "부천시",
  "성남시",
  "수원시",
  "시흥시",
  "안산시",
  "안성시",
  "안양시",
  "양주시",
  "양평군",
  "여주시",
  "연천군",
  "오산시",
  "용인시",
  "의왕시",
  "의정부시",
  "이천시",
  "파주시",
  "평택시",
  "포천시",
  "하남시",
  "화성시"
];
const 경상남도 = [
  "거제시",
  "거창군",
  "고성군",
  "김해시",
  "남해군",
  "밀양시",
  "사천시",
  "산청군",
  "양산시",
  "의령군",
  "진주시",
  "창녕군",
  "창원시",
  "통영시",
  "하동군",
  "함안군",
  "함양군",
  "합천군"
];
const 경상북도 = [
  "경산시",
  "경주시",
  "고령군",
  "구미시",
  "군위군",
  "김천시",
  "문경시",
  "봉화군",
  "상주시",
  "성주군",
  "안동시",
  "영덕군",
  "영양군",
  "영주시",
  "영천시",
  "예천군",
  "울릉군",
  "울진군",
  "의선군",
  "청도군",
  "청송군",
  "칠곡군",
  "포항시"
];
const 광주광역시 = ["광산구", "남구", "동구", "북구", "서구"];
const 대구광역시 = ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"];
const 대전광역시 = ["대덕구", "동구", "서구", "유성구", "중구"];
const 부산광역시 = [
  "강서구",
  "금정구",
  "기장군",
  "남구",
  "동구",
  "동래구",
  "부산진구",
  "북구",
  "사상구",
  "사하구",
  "서구",
  "수영구",
  "연제구",
  "영도구",
  "중구",
  "해운대구"
];
const 세종시 = [
  "가람동",
  "고운동",
  "금남면",
  "나성동",
  "다정동",
  "대평동",
  "도담동",
  "반곡동",
  "보람동",
  "부강면",
  "산울동",
  "새롬동",
  "소담동",
  "소정면",
  "아름동",
  "어진동",
  "연기면",
  "연동면",
  "연서면",
  "장군면",
  "전동면",
  "전의면",
  "조치원읍",
  "종촌동",
  "집현동",
  "한솔동",
  "합강동",
  "해밀동"
];
const 울산광역시 = ["남구", "동구", "북구", "울주군", "중구"];
const 인천광역시 = ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"];
const 전라남도 = [
  "강진군",
  "고흥군",
  "곡성군",
  "광양시",
  "구례군",
  "나주시",
  "담양군",
  "목포시",
  "무안군",
  "보성군",
  "순천시",
  "신안군",
  "여수시",
  "영광군",
  "영암군",
  "완도군",
  "장성군",
  "장흥군",
  "진도군",
  "함평ㅇ군",
  "해남군",
  "화순군"
];
const 전라북도 = [
  "고창군",
  "군산시",
  "김제시",
  "남원시",
  "무주군",
  "부안군",
  "순창군",
  "완주군",
  "익산시",
  "임실군",
  "장수군",
  "전주시",
  "정읍시",
  "진안군"
];
const 제주도 = ["서귀포시", "제주시"];
const 충청남도 = [
  "계룡시",
  "공주시",
  "금산군",
  "논산시",
  "당진시",
  "보령시",
  "부여군",
  "서산시",
  "서천군",
  "아산시",
  "예산군",
  "천안시",
  "청양군",
  "태안군",
  "홍성군"
];
const 충청북도 = [
  "괴산군",
  "단양군",
  "보은군",
  "영동군",
  "옥천군",
  "음성군",
  "제천시",
  "증평군",
  "진천군",
  "청주시",
  "충주시"
];

export default function SigoonOptions({
  sido,
  name,
  onChange,
  value
}: {
  sido: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  const [sigoon, setSigoon] = useState<string[]>([]);
  const sigoonRef = useRef<string[]>();
  switch (sido) {
    case "경기도":
      sigoonRef.current = 경기도;
      break;
    case "서울시":
      sigoonRef.current = 서울시;
      break;
    case "강원도":
      sigoonRef.current = 강원도;
      break;
    case "경상남도":
      sigoonRef.current = 경상남도;
      break;
    case "경상북도":
      sigoonRef.current = 경상북도;
      break;
    case "광주광역시":
      sigoonRef.current = 광주광역시;
      break;
    case "대구광역시":
      sigoonRef.current = 대구광역시;
      break;
    case "대전광역시":
      sigoonRef.current = 대전광역시;
      break;
    case "부산광역시":
      sigoonRef.current = 부산광역시;
      break;
    case "세종시":
      sigoonRef.current = 세종시;
      break;
    case "울산광역시":
      sigoonRef.current = 울산광역시;
      break;
    case "인천광역시":
      sigoonRef.current = 인천광역시;
      break;
    case "전라남도":
      sigoonRef.current = 전라남도;
      break;
    case "전라북도":
      sigoonRef.current = 전라북도;
      break;
    case "제주도":
      sigoonRef.current = 제주도;
      break;
    case "충청남도":
      sigoonRef.current = 충청남도;
      break;
    case "충청북도":
      sigoonRef.current = 충청북도;
      break;
  }
  // console.log(sigoonRef, " 시군찍히나?");
  return (
    <select
      name={name}
      onChange={onChange}
      value={value}
      className="h-full w-full border-[1px] border-[#C2C2C2] rounded-lg text-[#999] py-[14px] justify-start flex px-[12px]"
    >
      <option id="none">시/군/구</option>
      {sigoonRef.current?.map((item) => {
        return <option key={nanoid()}>{item}</option>;
      })}
    </select>
  );
}
