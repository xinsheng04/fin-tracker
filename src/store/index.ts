import {configureStore} from '@reduxjs/toolkit';
import myWalletReducer from './myWallet';
import userInfoReducer from './userInfo';
const store = configureStore({
  reducer:{
    myWallet: myWalletReducer,
    userInfo: userInfoReducer,
  }
})

export default store;