import { typeOfShop } from "@/app/assets/types/types";
import { createSlice } from "@reduxjs/toolkit";

const isServer = typeof window === "undefined";
const shopshop = {
  가격1: 0,
  가격2: 0,
  가격3: 0,
  메뉴1: "",
  메뉴2: "",
  메뉴3: "",
  시군: "",
  시도: "",
  업소명: "",
  업종: "",
  연락처: "",
  주소: "",
};

const initialState: typeOfShop = shopshop;

const detailshopSlice = createSlice({
  name: "detailshop",
  initialState,
  reducers: {
    getShop: (state, action) => {
      const {
        가격1,
        가격2,
        가격3,
        메뉴1,
        메뉴2,
        메뉴3,
        시군,
        시도,
        업소명,
        업종,
        연락처,
        주소,
      } = action.payload;
      // console.log(action.payload);
      localStorage.setItem("money1", String(가격1));
      localStorage.setItem("money2", String(가격2));
      localStorage.setItem("money3", String(가격3));
      localStorage.setItem("menu1", 메뉴1);
      localStorage.setItem("menu2", 메뉴2);
      localStorage.setItem("menu3", 메뉴3);
      localStorage.setItem("sigoon", 시군);
      localStorage.setItem("sido", 시도);
      localStorage.setItem("upso", 업소명);
      localStorage.setItem("upzong", 업종);
      localStorage.setItem("phoneNum", 연락처);
      localStorage.setItem("addr", 주소);

      return action.payload;
    },
  },
});

export const { getShop } = detailshopSlice.actions;
export default detailshopSlice.reducer;
