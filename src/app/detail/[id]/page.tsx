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
      <MapTest />
      <div className="bg-blue-300">디테일페이지야</div>
      <div className="flex flex-col bg-red-500 ">
        <ImagePage />

        <Shopinfo />
        <ShareBtn />
      </div>
      <DoneAssess />

      <Hoogi />
    </section>
  );
}
