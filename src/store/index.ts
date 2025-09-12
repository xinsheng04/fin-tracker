import {configureStore} from '@reduxjs/toolkit';
import myWalletReducer from './myWallet';
const store = configureStore({
  reducer:{
    myWallet:myWalletReducer,
  }
})

export default store;