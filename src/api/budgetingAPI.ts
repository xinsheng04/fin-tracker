import api from './Api';
import type { Category } from '../util/transactionTypes';
import { queryClient } from './Api';
import { useQuery, useMutation } from '@tanstack/react-query';

interface budgetObject {
  title: string;
  categoryAndAmount: { category: Category; limitAmount: number }[] | null;
}

export const useGetAllBudgets = (email: string) => {
  return useQuery({
    queryKey: ['budgetId', email],
    queryFn: () => getAllBudgetDataAPI(email),
    enabled: !!email
  });
}

export const useAddBudget = (email: string) => {
  return useMutation({
    mutationFn: (b: budgetObject) => addBudgetAPI(email, b),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgetId', email] });
    },
    onError: (error: any) => {
      throw new Error(error.message || 'An error occurred while adding the budget.');
    }
  })
}

export const useUpdateBudget = (email: string) => {
  return useMutation({
    mutationFn: (variables: { changes: { columns: string, value: string }[], title?: string }) =>
      updateBudgetAPI(email, variables.changes, variables.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgetId', email] });
    },
    onError: (error: any) => {
      throw new Error(error.message || 'An error occurred while updating the budget.');
    }
  })
}

export const useResetBudgetProgress = (email: string) => {
  return useMutation({
    mutationFn: (id: number) => resetBudgetProgressAPI(email, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgetId', email] });
    },
    onError: (error: any) => {
      throw new Error(error.message || 'An error occurred while resetting the budget progress.');
    }
  })
}

export const useDeleteBudget = (email: string) => {
  return useMutation({
    mutationFn: (id: number) => delBudget(email, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgetId', email] });
    },
    onError: (error: any) => {
      throw new Error(error.message || 'An error occurred while deleting the budget.');
    }
  })
}

export const addBudgetAPI = async (email: string, data: budgetObject) => {
  const body = { title: data.title, items: data.categoryAndAmount };
  try {
    const response = await api.post('/budgeting/add', body, { params: { email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to add budget: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

export const getAllBudgetDataAPI = async (email: string) => {
  try {
    const response = await api.get('/budgeting/getAll', { params: { email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to get budgets: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

export const updateBudgetAPI = async (email: string, changes: { columns: string, value: string }[], title?: string) => {
  try {
    const body = { title, updatedBudgetItems: changes };
    const response = await api.patch('/budgeting/edit', body, { params: { email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to update budget: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

export const resetBudgetProgressAPI = async (email: string, id: number) => {
  try {
    const response = await api.patch('/budgeting/reset', { params: { id, email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to reset budget progress: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

// delete api 
export const delBudget = async (email: string, id: number) => {
  try {
    const response = await api.delete('/budgeting/delete', { params: { id, email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete Budget ' + error)
  }
}


