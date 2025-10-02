import api from './Api.ts';
// calling the get Request 
export const getCards = async (email:string) => { 
  const res = await api.get('/getCards',{params:{email}});
  return res.data;
} 

// calling the post request for registering a card @ wallet
export const regCard = async(payload:{
  email:string;
  cardNo:string;
  amount:number;
  bankName:string;
}) => {
  const res = await api.post('/regCard',payload);
  return res.data;
}

// calling the delete request for wallet / card
export const delCard = async(payload:{
  email:string;
  cardNo:string;
})=>{
  const res = await api.delete('/deleteCard',{data:payload})
  return res.data;
}

