import React from "react";
import "./layout.css";

export default function Footer() {
  return (
    <>
      <footer className="text-gray-700 body-font">
        <div className="bg-gray-200">
          <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              팀 | 2만큼 성장했조
            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              <div>
                팀원 | 리더 여인준 부리더 이아름 팀원 이상욱 팀원 한지우
              </div>
              <div> 디자이너 | 이가현</div>
            </span>
          </div>
          <div className="container mx-auto pb-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              Copyright ⓒ 2024 2만큼 성장했조. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
