import React from "react";
import userIcon from "../../assets/images/icon/profile.png";
import Image from "next/image";

export default function communityDetail() {
  return (
    <>
      {/* 커뮤니티 디테일 전체 컨테이너 */}
      <div className="flex flex-col items-center w-[100%] h-[100%]">
        <div className="flex flex-col gap-[20px]">
          <div className=" mr-[29%]">
            <h2 className="text-[30px] font-bold">게시글 제목입니다.</h2>
            <time>2024.01.01 12:00 PM</time>
          </div>

          {/* 프로필 컨테이너 */}
          <div className="flex gap-[10px] mr-[36%]">
            <Image className="w-[28px] h-[28px]" src={userIcon} alt="profile" />
            <p>나는 리액트다</p>
          </div>
          <hr className="w-[700px]"></hr>

          {/* 내용 컨테이너 */}
          <div className="flex flex-col gap-[20px]">
            <p>님들 넥스트js어때요?</p>
            <p className=" border-2 w-[600px] h-[300px]">next.js 사진</p>
          </div>

          {/* 공감해요 컨테이너 */}
          <div className="flex gap-[20px]">
            <p>♥ 공감해요</p>
            <p>댓글 00</p>
          </div>

          <hr className="w-[700px]"></hr>

          {/* 댓글작성,버튼 컨테이너*/}
          <div className="flex justify-end gap-[20px]">
            <input
              className="border-2 border-gray-[400] w-[550px] h-[48px] rounded-[10px] outline-none"
              placeholder="댓글을 작성해주세요."
            ></input>
            <button className="w-[115px] h-[50px] border-2 rounded-[10px] border-white text-[white] bg-[#FF8145] hover:bg-[#E5743E]">
              댓글남기기
            </button>
          </div>
          {/* 대댓글 컨테이너 */}
          <div className="flex gap-[10px]">
            <Image className="w-[28px] h-[28px]" src={userIcon} alt="profile" />
            <p>나는 타입스크립트다</p>
            <p>타입스크립트 어떤데~</p>
          </div>
        </div>
      </div>
    </>
  );
}
