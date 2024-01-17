import { createSlice } from "@reduxjs/toolkit";
import profile from "../../app/assets/images/icon/profile.png";
const initialState = {
  isLogin: false,
  displayName: "",
  uid: "",
  photoURL: profile,
  email: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      const { uid, displayName, photoURL, email, email1 } = action.payload;
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("uid", uid);
      localStorage.setItem("photoURL", photoURL);
      email
        ? localStorage.setItem("email", email)
        : localStorage.setItem("email", email1);
      state.isLogin = true;
      state.displayName = displayName;
      state.uid = uid;
      state.photoURL = photoURL;
      email ? (state.email = email) : (state.email = email1);
    },
    logout: (state, action) => {
      localStorage.clear();
      state.isLogin = false;
      state.displayName = "";
      state.uid = "";
      state.photoURL = profile;
      state.email = "";
    },

    updateNickname: (state, action) => {
      localStorage.setItem("displayName", action.payload);
      state.displayName = action.payload;
    },
    updatePhoto: (state, action) => {
      localStorage.setItem("photoURL", action.payload);
      state.photoURL = action.payload;
    },
  },
});

export const { login, logout, updateNickname, updatePhoto } =
  loginSlice.actions;
export default loginSlice.reducer;
