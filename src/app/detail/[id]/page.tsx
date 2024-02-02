import React from "react";
import Shopinfo from "@/components/detail/Shopinfo";

import Hoogi from "@/components/detail/Hoogi";
import MapTest from "@/components/detail/MapTest";
import ShareBtn from "@/components/detail/ShareBtn";
import DoneAssess from "@/components/detail/DoneAssess";
import ImagePage from "@/components/detail/ImagePage";

export default function DetailPage() {
  return (
    <div className="px-[20px] flex justify-center items-center">
      <div className="flex justify-center items-center w-full  max-sm:py-[20px]">
        <div className="flex justify-center flex-row">
          <section className="flex flex-col sm:my-[60px] lg:mr-[40px] justify-center">
            <section>
              <div className="flex flex-col w-full">
                <ImagePage />
                <div className="lg:hidden mt-[32px]">
                  <ShareBtn />
                </div>
                <Shopinfo />
                <div className="border-[1px] border-[#E1E1E1] w-full my-[40px]" />
              </div>
            </section>

            <section>
              <DoneAssess />
            </section>
            {/* <Hoogi /> */}
          </section>
          <section>
            <MapTest />
          </section>
        </div>
      </div>
    </div>
  );
}
