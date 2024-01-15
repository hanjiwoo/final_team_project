import { typeOfShop } from "@/app/assets/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: typeOfShop[] = [];

const allShopsSlice = createSlice({
  name: "allshops",
  initialState,
  reducers: {
    getAllShops: (state, action) => {
      // console.log(action.payload);
      return action.payload;
    },
  },
});

export const { getAllShops } = allShopsSlice.actions;
export default allShopsSlice.reducer;
