import { configureStore } from "@reduxjs/toolkit";
import shops from "../modules/shopsSlice";
import detailShop from "../modules/detailShopSlice";
import share from "../modules/shareSlice";
import allShops from "../modules/allShops";
import loginSlice from "../modules/loginSlice";

const store = configureStore({
  reducer: {
    shops,
    detailShop,
    share,
    allShops,
    loginSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
