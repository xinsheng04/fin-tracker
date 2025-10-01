import api from './Api';
interface AssetLiabilityObject {
  title: string;
  value: number;
  description: string;
  date: string;
  type: "asset" | "liability";
  category: "current" | "fixed";
};

export const addAssetLiabilityAPI = async (email: string, data: AssetLiabilityObject) => {
  const body = { assetLiability: data };
  try{
    const response = await api.post(`/assetLiabilities/add?email=${email}`, body);
    return response.data;
  } catch (error: any) {
    console.error('Failed to add asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

export const getAssetLiabilityAPI = async (email: string) => {
  try{
    const response = await api.get(`/assetLiabilities/getAll?email=${email}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

export const updateAssetLiabilityAPI = async (email: string, changes: { columns: string, value: string}[]) => {
  try{
    const response = await api.put(`/assetLiabilities/edit?email=${email}`, { changes });
    return response.data;
  } catch (error: any) {
    console.error('Failed to update asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}

export const deleteAssetLiabilityAPI = async (email: string, id: string) => {
  try{
    const response = await api.delete(`/assetLiabilities/delete?email=${email}&id=${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete asset/liability: ' + error.response?.data?.error || error.message);
    throw error;
  }
}