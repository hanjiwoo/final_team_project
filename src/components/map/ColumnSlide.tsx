"use client";
import { typeOfShop } from "@/app/assets/types/types";
import { RootState } from "@/redux/config/configStore";
import React from "react";
import { useSelector } from "react-redux";
import ShopCard from "../home/ShopCard";
import { nanoid } from "nanoid";

export default function ColumnSlide() {
  const shops = useSelector((state: RootState) => state.shops);

  return (
    <>
      <div className="flex flex-col">
        {shops.map((shop: typeOfShop) => {
          return (
            <React.Fragment key={nanoid()}>
              <ShopCard shops={shops} shop={shop} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
