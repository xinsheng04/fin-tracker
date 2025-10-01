import { configureStore } from '@reduxjs/toolkit';
import myWalletReducer from './myWallet';
import transactionReducer from './transaction';
import budgetReducer from './budgeting';
import userInfoReducer from './userInfo';
import assetLiabilityReducer from './assetLiability';

// Load from local storage 
function loadUserInfo(){
  try{
    const raw = localStorage.getItem('userInfo');
    if (!raw) return undefined;
    return JSON.parse(raw);
  }catch{
    return undefined;
  }
}

function saveUserInfo(userInfo:any){
  try{
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
  }
  catch{}
}

// provide only the userInfo slice as preloadedState
const preloadedState= { 
  userInfo: loadUserInfo()?? undefined,
}

const store = configureStore({
  reducer: {
    myWallet: myWalletReducer,
    userInfo: userInfoReducer,
    transaction: transactionReducer,
    budgeting: budgetReducer,
    assetLiability: assetLiabilityReducer
  },
  preloadedState,
})

// persist only userInfo on changes
let prevUserInfo: any;
store.subscribe(() => {
  const state: any = store.getState();
  if (state.userInfo !== prevUserInfo) {
    prevUserInfo = state.userInfo;
    saveUserInfo(state.userInfo);
  }
});

export default store;