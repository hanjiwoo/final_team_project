import React from "react";
import Shopinfo from "@/components/detail/Shopinfo";

import Hoogi from "@/components/detail/Hoogi";
import MapTest from "@/components/detail/MapTest";
import ShareBtn from "@/components/detail/ShareBtn";
import TestPage from "@/components/detail/TestPage";
import DoneAssess from "@/components/detail/DoneAssess";
export default function DetailPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="bg-blue">디테일페이지야</div>
      <div className="flex flex-row gap-15">
        <div className="flex flex-col justify-around items-center bg-green-300 w-1/4">
          <MapTest />
          <ShareBtn />
        </div>
        <Shopinfo />
        <TestPage />
      </div>
      <DoneAssess />
      <Hoogi />
    </section>
  );
}
