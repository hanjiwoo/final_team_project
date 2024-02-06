import { createSlice } from "@reduxjs/toolkit";
import profile from "../../app/assets/images/icon/profile.png";
const initialState = {
  isLogin: false,
  displayName: "",
  uid: "",
  photoURL: "",
  email: "",
  isKakao: false
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
      email ? localStorage.setItem("email", email) : localStorage.setItem("email", email1);
      state.isLogin = true;
      state.displayName = displayName;
      state.uid = uid;
      state.photoURL = photoURL;
      email ? (state.email = email) : (state.email = email1);
    },
    loginKakao: (state, action) => {
      const { name, email, image } = action.payload;
      state.isKakao = true;
      state.displayName = name;
      state.email = email;
      state.photoURL = image;
      state.uid = email;
      localStorage.setItem("displayName", name);
      localStorage.setItem("uid", email);
      localStorage.setItem("photoURL", image);
      localStorage.setItem("email", email);
    },
    logout: (state, action) => {
      localStorage.clear();
      state.isLogin = false;
      state.displayName = "";
      state.uid = "";
      state.photoURL = "";
      state.email = "";
      state.isKakao = false;
    },

    updateNickname: (state, action) => {
      localStorage.setItem("displayName", action.payload);
      state.displayName = action.payload;
    },
    updatePhoto: (state, action) => {
      localStorage.setItem("photoURL", action.payload);
      state.photoURL = action.payload;
    }
  }
});

export const { login, logout, updateNickname, updatePhoto, loginKakao } = loginSlice.actions;
export default loginSlice.reducer;
