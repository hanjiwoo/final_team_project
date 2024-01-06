import { configureStore } from "@reduxjs/toolkit";
import shop from "../modules/shopSlice";
import detailShop from "../modules/detailShopSlice";
const store = configureStore({
  reducer: {
    shop,
    detailShop,
  },
});

export default store;
