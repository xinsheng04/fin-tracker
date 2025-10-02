import api from './Api';
import type { Category } from '../util/transactionCategories';
import { queryClient } from './Api';
import { useQuery, useMutation } from "@tanstack/react-query";

interface TransactionsObject {
  amount: number;
  typeOfTransfer: "income" | "expense";
  category: Category;
  comments: string;
  cardNo: string;
}

export const useGetAllTransactions = (email: string) => {
  return useQuery({
    queryKey: ['transactions', email],
    queryFn: () => getAllTransactionsAPI(email)
  });
}

export const useAddTransaction = (email: string, transaction: TransactionsObject) => {
  return useMutation({
    mutationFn: () => addTransactionEntryAPI(email, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', email] });
    },
    onError: (error) => {
      alert('Error adding transaction: ' + (error as Error).message);
    }
  });
}

const addTransactionEntryAPI = async (email: string, transaction: TransactionsObject) => {
  try{
    const response = await api.post(`/transactions/add?email=${email}`, { transaction });
    if(response.status !== 200){
      throw new Error('Failed to add transaction: ' + response.statusText);
    }
  } catch(error: any){
    console.error('Failed to add transaction: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

const getAllTransactionsAPI = async (email: string) => {
  try{
    const response = await api.get(`/transactions/getAll?email=${email}`);
    return response.data;
  } catch(error: any){
    console.error('Failed to get all transactions: ' + error.response?.data?.error || error.message);
    throw error;
  }
}