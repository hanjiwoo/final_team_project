import React, { useState } from "react";

export default function ListPage() {
  const [community, setCommunity] = useState([
    {
      id: "",
      title: "",
      contents: "",
      nickname: "",
      createdOn: "",
    },
  ]);
  return (
    <>
      <h1>리스트 영역입니다.</h1>
      {community}
    </>
  );
}
