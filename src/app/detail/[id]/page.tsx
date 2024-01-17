import React from "react";
import Shopinfo from "@/components/detail/Shopinfo";

import Hoogi from "@/components/detail/Hoogi";
import MapTest from "@/components/detail/MapTest";
import ShareBtn from "@/components/detail/ShareBtn";
import DoneAssess from "@/components/detail/DoneAssess";
import ImagePage from "@/components/detail/ImagePage";
export default function DetailPage() {
	return (
		<div className="flex justify-center items-center w-full">
			<div className="flex justify-center flex-row">
				<section className="flex flex-col my-[60px] mr-[40px]">
					{/* <div className="bg-blue-300">디테일페이지야</div> */}
					<section>
						<div className="flex flex-col ">
							<ImagePage />
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
					{/* <ShareBtn /> */}
				</section>
			</div>
		</div>
	);
}
