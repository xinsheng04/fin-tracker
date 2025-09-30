import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  fname: String;
  lname: String;
  email: String;
  role: String;
}

const initialState: UserInfo = {
  fname: "",
  lname: "",
  email: "",
  role: "User",
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<UserInfo>) {
      return {...state, ...action.payload};
    },
    logout() {
      return initialState;
    }
  }
});
export const { login, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;