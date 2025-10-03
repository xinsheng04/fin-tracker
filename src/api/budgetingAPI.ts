import api from './Api';
import type { Category } from '../util/transactionTypes';

interface budgetObject {
  title: string;
  categoryAndAmount: { category: Category; limitAmount: number }[] | null;
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
export const delBudget = async(email:string, id:string)=>{
  try{
    const response = await api.delete('/budgeting',{params:{email,id}});
    return response.data;
  }catch(error:any){
    console.error('Failed to delete Budget ' + error.response?.data?.error|| error.message)
  }
}


