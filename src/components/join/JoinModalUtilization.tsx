import React, { Dispatch, SetStateAction } from "react";

export default function JoinModalUtilization({
	setOpenModalUtilization,
}: {
	setOpenModalUtilization: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className="w-full h-full flex justify-center items-center bg-[#5C5C5C]/20 fixed z-[1] top-0 left-0">
			<div className="w-[536px] bg-[#fff] p-[32px] flex gap-[32px] flex-col rounded-[16px]">
				<h1 className="text-[24px] font-[600] leading-[32px] text-[#212121]">
					이용약관(필수)
				</h1>
				<form className="w-full flex gap-[16px] flex-col">
					<span className="text-[16px] font-[600] leading-[24px] text-[#212121]">
						총칙
					</span>
					<h2 className="text-[18px] leading-[26px] font-[600] text-[#212121]">
						제 1조 [목적]
					</h2>
					<div className="text-[#5C5C5C]">
						본 약관은 모음 (이하 &quot;모음&quot;)이 제공하는 모든 서비스(이하
						&quot;서비스&quot;)의 이용조건 및 절차, 이용자와 모음의 권리, 의무,
						책임사항과 기타 제반 사항을 규정함을 목적으로 합니다.
					</div>
				</form>
				<button
					className="flex justify-center items-center h-[48px] rounded-[8px] py-[8px] px-[16px] bg-[#FF8145] text-[14px] text-[#fff] leading-[20px]"
					onClick={() => setOpenModalUtilization(false)}
				>
					확인
				</button>
			</div>
		</div>
	);
}
