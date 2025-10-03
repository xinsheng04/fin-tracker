import api from './Api.ts';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from './Api';

export const useGetCards = (email: string) => {
  return useQuery({
    queryKey: ['cards', email],
    queryFn: () => getCards(email),
    staleTime: 60 * 1000, // 1 minute
  });
}

export const useRegCard = (email: string) => {
  return useMutation({
    mutationFn: (card: { cardNo: string; amount: number; bankName: string }) =>
      regCard({ email, ...card }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', email] });
    },
    onError: (error) => {
      alert('Error registering card: ' + (error as Error).message);
    }
  });
}

export const useDelCard = (email: string) => {
  return useMutation({
    mutationFn: (cardNo: string) => delCard({ email, cardNo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', email] });
    },
    onError: (error) => {
      alert('Error deleting card: ' + (error as Error).message);
    }
  });
}

// calling the get Request 
export const getCards = async (email: string) => {
  const res = await api.get('/getCards', { params: { email } });
  return res.data;
}

// calling the post request for registering a card @ wallet
export const regCard = async (payload: {
  email: string;
  cardNo: string;
  amount: number;
  bankName: string;
}) => {
  const res = await api.post('/regCard', payload);
  return res.data;
}

// calling the delete request for wallet / card
export const delCard = async (payload: {
  email: string;
  cardNo: string;
}) => {
  const res = await api.delete('/deleteCard', { data: payload })
  return res.data;
}

// adding money to the card 
export const  updateAmount = async (payload:{
  email:string;
  cardNo:string;
  action:string;
  amount:string;
})=>{
  try{
  const res = await api.patch('/changeAmount',{data:payload})
  return res.data
}catch(error){
    console.error(error);
  }
}
