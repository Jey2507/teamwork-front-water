import axios from '../../common/axiosConfig';

export const addWaterReq = async (waterData) => {
  const { data } = await axios.post('/water/add-water', waterData);
  return data.data; 
};

export const getWaterDayReq = async (date) => {
  const { data } = await axios.get(`/water/daily-water?date=${date}`);
  return data.data; 
};

export const getWaterMonthReq = async (date) => {
  const { data } = await axios.get(`/water/monthly-water?date=${date}`);
  return data.data; 
};

export const deleteWaterReq = async (id) => {
  const { data } = await axios.delete(`/water/delete-water/${id}`);
  return data.data;
};

export const updateWaterIntakeReq = async (id, formData) => {
  try {
    const { data } = await axios.patch(`/water/update-water/${id}`, formData);
    return data.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Failed to update water intake record');
  }
};