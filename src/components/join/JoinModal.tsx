import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

export default function JoinModal({
	setOpenModal,
	id,
}: {
	setOpenModal: Dispatch<SetStateAction<number | null>>;
	id: number;
}) {
	// const router = useRouter();

	const getContentById = (id: number) => {
		switch (id) {
			case 1:
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
									정보통신망이용촉진 및 정보보호 등에 관한 법률 제 21조
									제1항에서 만 14세 미만 아동의 개인정보 수집 시 부모의 동의를
									얻도록 규정하고 있습니다.
									<br />
									<br />만 14세미만 어린이의 경우 회원가입 시
									보호자(법정대리인)의 실명인증을 통한 가입 동의가 필요합니다.
								</div>
							</form>
							<button
								className="flex justify-center items-center h-[48px] rounded-[8px] py-[8px] px-[16px] bg-[#FF8145] text-[14px] text-[#fff] leading-[20px]"
								onClick={() => setOpenModal(null)}
							>
								확인
							</button>
						</div>
					</div>
				);
			case 2:
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
									본 서비스는 행정안전부 공공 데이터를 활용해서 제작 되었습니다
									<br />
									<br />본 서비스는 아직 미흡한 부분이 존재합니다 이를 인지하고
									서비스를 이용하시겠습니까?
								</div>
							</form>
							<button
								className="flex justify-center items-center h-[48px] rounded-[8px] py-[8px] px-[16px] bg-[#FF8145] text-[14px] text-[#fff] leading-[20px]"
								onClick={() => setOpenModal(null)}
							>
								확인
							</button>
						</div>
					</div>
				);
			case 3:
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
									본 서비스를 원활하게 이용하기 위해 아래 내용과 같은 개인
									정보를 수집하고 있습니다 이에 동의 하십니까?
									<br />
									<br />
									<span className="text-[#5e76ff]">
										(이메일 주소, 닉네임, 프로필사진)
									</span>
								</div>
							</form>
							<button
								className="flex justify-center items-center h-[48px] rounded-[8px] py-[8px] px-[16px] bg-[#FF8145] text-[14px] text-[#fff] leading-[20px]"
								onClick={() => setOpenModal(null)}
							>
								확인
							</button>
						</div>
					</div>
				);
			case 4:
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
									본 서비스에 대한 광고 알림이 갈 것 처럼 약관 동의를 넣어봤는데
									체크 해보시겠어요? 물론 알림 가는 기능은 없습니다
								</div>
							</form>
							<button
								className="flex justify-center items-center h-[48px] rounded-[8px] py-[8px] px-[16px] bg-[#FF8145] text-[14px] text-[#fff] leading-[20px]"
								onClick={() => setOpenModal(null)}
							>
								확인
							</button>
						</div>
					</div>
				);
		}
	};

	return getContentById(id);
}
