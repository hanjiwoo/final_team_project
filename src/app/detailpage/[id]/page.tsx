import React from "react";
import Shopinfo from "@/components/detail/Shopinfo";
import Mapinfo from "@/components/detail/Mapinfo";
import Post from "@/components/detail/Post";
import MapTest from "@/components/detail/MapTest";

export default function DetailPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="bg-blue">디테일페이지야</div>
      <div className="flex flex-row gap-15">
        <MapTest />
        <Shopinfo />
      </div>
      <Post />
    </section>
  );
}
