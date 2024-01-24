import React from "react";
import "./layout.css";

export default function Footer() {
	return (
		<div className="w-1080 z-100">
			<footer className="text-gray-700 body-font w-full">
				<div className="bg-gray-200">
					<div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
						<p className="text-gray-500 text-sm text-center sm:text-left">
							찾아오시는 길
						</p>
						<span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
							<div> 팀 | 2만큼 성장했조</div>
							<div>
								팀원 | 리더 여인준 부리더 이아름 팀원 이상욱 팀원 한지우
								디자이너 이가현
							</div>
							<span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
								Copyright ⓒ 2024 2만큼 성장했조. All Rights Reserved.
							</span>
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
