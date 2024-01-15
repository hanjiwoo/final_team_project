import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: !!localStorage.getItem("accessToken"),
	displayName: localStorage.getItem("displayName"),
	uid: localStorage.getItem("uid"),
	photoURL: localStorage.getItem("photoURL"),
	email: localStorage.getItem("email"),
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		login: (state, action) => {
			const { displayName, uid, photoURL, email } = action.payload;
			localStorage.setItem("displayName", displayName);
			localStorage.setItem("uid", uid);
			localStorage.setItem("photoURL", photoURL);
			localStorage.setItem("email", email);
			state.isLogin = true;
			state.displayName = displayName;
			state.uid = uid;
			state.photoURL = photoURL;
			state.email = email;
		},
		// logout: (state, action) => {
		//   localStorage.clear();

		//   return (state = {});
		// },
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

export const { login, updateNickname, updatePhoto } = loginSlice.actions;
export default loginSlice.reducer;
