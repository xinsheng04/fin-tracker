import {configureStore} from '@reduxjs/toolkit';
import myWalletReducer from './myWallet';
import transactionReducer from './transaction';
import budgetReducer from './budgeting';
import userInfoReducer from './userInfo';
const store = configureStore({
  reducer:{
    myWallet: myWalletReducer,
    userInfo: userInfoReducer,
    transaction: transactionReducer,
    budgeting:budgetReducer
  }
})

export default store;