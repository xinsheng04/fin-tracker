import {configureStore} from '@reduxjs/toolkit';
import myWalletReducer from './myWallet';
import transactionReducer from './transaction';
import userInfoReducer from './userInfo';
const store = configureStore({
  reducer:{
    myWallet: myWalletReducer,
    userInfo: userInfoReducer,
    transaction: transactionReducer
  }
})

export default store;