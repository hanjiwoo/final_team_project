import React from "react";
import Hoogi from "./Hoogi";

export default function PostModal({
	setModal,
}: {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const moveToBack = () => {
		setModal(false);
	};
	return (
		<section
			className="w-full h-full z-[999] fixed top-0 left-0 Class
    Properties
     flex justify-center items-center"
			style={{ background: "rgba(0, 0, 0, 0.5)" }}
		>
			<div className="w-[600px] h-[800px] bg-purple-400 flex flex-col items-center">
				<div className="flex justify-between w-full font-black">
					<h1 className="text-[24px] leading-[32px] font-semibold text-[#212121]">
						오늘 방문한 매장은 어떤가요?
					</h1>
					<button onClick={moveToBack} className="text-2xl">
						✖️
					</button>
				</div>
				<Hoogi setModal={setModal} />
			</div>
		</section>
	);
}
