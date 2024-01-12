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
const initialState: typeOfShop[] = [
  {
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
  },
];

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getShops: (state, action) => {
      // console.log(action.payload);
      return action.payload;
    },
  },
});

export const { getShops } = shopSlice.actions;
export default shopSlice.reducer;
