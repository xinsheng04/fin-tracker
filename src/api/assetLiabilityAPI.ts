import api from './Api';
import { queryClient } from './Api';
import { useQuery, useMutation } from "@tanstack/react-query";

interface AssetLiabilityObject {
  title: string;
  value: number;
  description: string;
  date: string;
  type: "asset" | "liability";
  category: "current" | "fixed";
};

export const useGetAllAssetLiabilities = (email: string) => {
  return useQuery({
    queryKey: ['assetLiabilities', email],
    queryFn: () => getAssetLiabilityAPI(email),
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useAddAssetLiability = (email: string) => {
  return useMutation({
    mutationFn: (data: AssetLiabilityObject) => addAssetLiabilityAPI(email, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assetLiabilities', email] });
    }
  })
};

export const useUpdateAssetLiability = (email: string) => {
  return useMutation({
    mutationFn: (changes: { columns: string, value: string}[]) => updateAssetLiabilityAPI(email, changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assetLiabilities', email] });
    }
  })
};

export const useDeleteAssetLiability = (email: string) => {
  return useMutation({
    mutationFn: (id: string) => deleteAssetLiabilityAPI(email, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assetLiabilities', email] });
    }
  })
}

const addAssetLiabilityAPI = async (email: string, data: AssetLiabilityObject) => {
  const body = { assetLiability: data };
  try{
    const response = await api.post('/assetLiabilities/add', body, { params: { email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to add asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

const getAssetLiabilityAPI = async (email: string) => {
  try{
    const response = await api.get('/assetLiabilities/getAll', { params: { email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to get asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

const updateAssetLiabilityAPI = async (email: string, changes: { columns: string, value: string}[]) => {
  try{
    const response = await api.put('/assetLiabilities/edit', { changes }, { params: { email } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to update asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

const deleteAssetLiabilityAPI = async (email: string, id: string) => {
  try{
    const response = await api.delete('/assetLiabilities/delete', { params: { email, id } });
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}