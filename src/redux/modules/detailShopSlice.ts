import { createSlice } from "@reduxjs/toolkit";
type typeOfShop = {
  가격1: number;
  가격2: number;
  가격3: number;
  메뉴1: string;
  메뉴2: string;
  메뉴3: string;
  시군: string;
  시도: string;
  업소명: string;
  업종: string;
  연락처: string;
  주소: string;
};
const shopshop = {
  가격1: localStorage.getItem("money1"),
  가격2: localStorage.getItem("money2"),
  가격3: localStorage.getItem("money3"),
  메뉴1: localStorage.getItem("menu1"),
  메뉴2: localStorage.getItem("menu2"),
  메뉴3: localStorage.getItem("menu3"),
  시군: localStorage.getItem("sigoon"),
  시도: localStorage.getItem("sido"),
  업소명: localStorage.getItem("upso"),
  업종: localStorage.getItem("upzong"),
  연락처: localStorage.getItem("phoneNum"),
  주소: localStorage.getItem("addr"),
};

const initialState: object = shopshop;

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
