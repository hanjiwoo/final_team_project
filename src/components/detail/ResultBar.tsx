import React from "react";

export default function ResultBar({ text, number, numbers }: { text: string; number: number; numbers: number }) {
  const tagCSS =
    "w-full h-[48px] rounded-[8px] mt-1 flex justify-between items-center bg-[#FAFAFA] relative overflow-hidden ";

  const numberCSS = "text-[#FF8145]";
  const textCSS = "absolute px-5 w-full h-full flex items-center justify-between";
  // console.log(number / numbers, "이거나 보자");
  const colorBarCSS = "absolute bg-pink-100 h-full w-1/3 ";

  return (
    <div className={tagCSS}>
      <p
        style={{
          width: `${number === 0 ? "0" : number / numbers === 1 ? "100" : (number / numbers) * 100}%`
        }}
        className={`absolute bg-[#FF8145] bg-opacity-10 h-full `}
      ></p>
      <div className={textCSS}>
        <p>{text}</p> <p className={numberCSS}>{number} </p>
      </div>
    </div>
  );
}
