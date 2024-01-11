import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  roadAddr: "",
  category: "",
  category2: "",
  id: "",
  phone: "",
  url: "",
  shopName: "",
  x: "",
  y: "",
};

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    getShare: (state, action) => {
      const {
        address_name,
        category_group_name,
        id,
        phone,
        place_name,
        place_url,
        x,
        y,
        road_address_name,
        category_name,
      } = action.payload;

      return {
        address: address_name,
        category: category_group_name,
        id: id,
        phone: phone,
        url: place_url,
        shopName: place_name,
        x,
        y,
        roadAddr: road_address_name,
        category2: category_name,
      };
    },
  },
});

export const { getShare } = shareSlice.actions;
export default shareSlice.reducer;
