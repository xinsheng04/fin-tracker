import api from './Api';
import type { Category } from '../util/transactionTypes';
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
    queryFn: () => getAllTransactionsAPI(email),
    staleTime: 60 * 1000, // 1 minute
  });
}

export const useAddTransaction = (email: string) => {
  return useMutation({
    mutationFn: (transaction: TransactionsObject) => addTransactionEntryAPI(email, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', email] });
      queryClient.invalidateQueries({ queryKey: ['cards', email] });
    },
    onError: (error) => {
      alert('Error adding transaction: ' + (error as Error).message);
    }
  });
}

const addTransactionEntryAPI = async (email: string, transaction: TransactionsObject) => {
  try {
    const response = await api.post('/transactions/add', { transaction }, { params: { email } });
    if (response.status !== 200) {
      throw new Error('Failed to add transaction: ' + response.statusText);
    }
  } catch (error: any) {
    console.error('Failed to add transaction: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

const getAllTransactionsAPI = async (email: string) => {
  try {
    const response = await api.get('/transactions/getAll', { params: { email } });
    console.log('Response: ', response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get all transactions: ' + error.response?.data?.error || error.message);
    throw error;
  }
}