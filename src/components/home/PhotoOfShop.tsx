import { typeOfShop } from "@/app/assets/types/types";

import React, { useEffect, useState } from "react";

export default function PhotoOfShop({ shop }: { shop: typeOfShop }) {
  return (
    <div className="w-[252px] h-[252px] bg-gray-100 rounded-[12px] mb-[20px]"></div>
  );
}
