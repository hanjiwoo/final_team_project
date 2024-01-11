"use client";
import React from "react";
export default function WritePage() {
  return (
    <div className=" w-48 h-80 m-auto">
      <div>
        <input
          className="border-2 border-black"
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div>
        <textarea
          className="border-2 border-black"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <button className="border-2 border-black">등록</button>
      <button className="border-2 border-black">취소</button>
    </div>
  );
}
