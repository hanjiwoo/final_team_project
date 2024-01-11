import React from "react";
import Shopinfo from "@/components/detail/Shopinfo";

import Hoogi from "@/components/detail/Hoogi";
import MapTest from "@/components/detail/MapTest";
import ShareBtn from "@/components/detail/ShareBtn";
import DoneAssess from "@/components/detail/DoneAssess";
import ImagePage from "@/components/detail/ImagePage";
export default function DetailPage() {
  return (
    <section className="flex flex-col  items-center">
      <div className="bg-blue">디테일페이지야</div>
      <div className="flex flex-col ">
        <div className="flex flex-row justify-center items-center bg-green-300 w-[800px]">
          <ImagePage /> <MapTest />
        </div>
        <Shopinfo />
        <ShareBtn />
      </div>
      <DoneAssess />

      <Hoogi />
    </section>
  );
}
