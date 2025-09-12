import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  fname: String;
  lname: String;
  email: String;
  profilePicUrl: String;
  role: String;
}

const initialState: UserInfo = {
  fname: "",
  lname: "",
  email: "",
  profilePicUrl: "",
  role: "User",
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers : {
    login(state, action: PayloadAction<UserInfo>) {
      return action.payload;
    },
    logout(){
      return initialState;
    }
  }
});

export default userInfoSlice.reducer;
export const userInfoActions = userInfoSlice.actions;