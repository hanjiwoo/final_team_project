import { configureStore } from "@reduxjs/toolkit";
import shop from "../modules/shopSlice";
import detailShop from "../modules/detailShopSlice";
import share from "../modules/shareSlice";
const store = configureStore({
  reducer: {
    shop,
    detailShop,
    share,
  },
});

export default store;
