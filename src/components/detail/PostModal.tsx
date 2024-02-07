import React from "react";
import Hoogi from "./Hoogi";
import Image from "next/image";
import closeBtn from "../../app/assets/images/icon/close_1.png";

export default function PostModal({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const moveToBack = () => {
    setModal(false);
  };
  return (
    <section
      className="w-full h-full z-[999] fixed top-0 left-0 Class
			Properties
     flex justify-center items-center "
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="w-[600px] h-[800px] flex flex-col items-center max-sm:h-full max-sm:w-full bg-[#fff] rounded-[16px] max-sm:overflow-y-scroll max-sm:rounded-none p-[32px]">
        <div className="flex justify-between w-full font-black top-[60px] items-center max-sm:top-0 max-sm:mb-[32px]">
          <h1 className="text-[24px] leading-[32px] font-semibold text-[#212121]">오늘 방문한 매장은 어떤가요?</h1>
          <Image
            width={100}
            height={100}
            src={closeBtn}
            alt="close"
            onClick={moveToBack}
            className="text-2xl cursor-pointer w-[24px] h-[24px]"
          />
        </div>
        <Hoogi setModal={setModal} />
      </div>
    </section>
  );
}
