import React, { Dispatch, SetStateAction } from "react";

export default function JoinModalAge({
	setOpenModal,
}: {
	setOpenModal: Dispatch<SetStateAction<boolean>>;
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
						만 14세 미만 어린이는 보호자(법정대리인)와 함께 가입해 주시기
						바랍니다.
						<br />
						<br />
						정보통신망이용촉진 및 정보보호 등에 관한 법률 제 21조 제1항에서 만
						14세 미만 아동의 개인정보 수집 시 부모의 동의를 얻도록 규정하고
						있습니다.
						<br />
						<br />만 14세미만 어린이의 경우 회원가입 시 보호자(법정대리인)의
						실명인증을 통한 가입 동의가 필요합니다.
					</div>
				</form>
				<button
					className="flex justify-center items-center h-[48px] rounded-[8px] py-[8px] px-[16px] bg-[#FF8145] text-[14px] text-[#fff] leading-[20px]"
					onClick={() => setOpenModal(false)}
				>
					확인
				</button>
			</div>
		</div>
	);
}
