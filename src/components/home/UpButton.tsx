"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import up from "../../app/assets/images/icon/arrow_up.png";

export default function UpButton() {
  const [showButton, setShowButton] = useState(false);

  const moveToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className="fixed bottom-[100px] right-[100px] z-[100]">
        <button
          className="flex flex-col items-center justify-center w-[52px] h-[52px] bg-[#fff] rounded-full shadow hover:scale-105"
          onClick={moveToTop}
          type="button"
        >
          <Image src={up} alt="업" className="w-[25px] h-[25px]" />
        </button>
      </div>
    )
  );
}
