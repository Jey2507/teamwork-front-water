import axios from '../../common/axiosConfig'

export const addWaterReq = async (arg) => {
  const { data } = await axios.post('/water/add-water', arg);
  return data;
}
export const getWaterDayReq = async (date) => {
  const { data } = await axios.get(`/water/daily-water?date=${date}`);
  return data;
};

export const getWaterMonthReq = async (date) => {
  const { data } = await axios.get(`/water/monthly-water?date=${date}`);
  return data;
};

export const updateWaterReq = async water => {
  const { data } = await axios.patch(`/water/update-water/${water.id}`, {
    amount: water.formData.amount,
    date: water.formData.date,
  });
  return data;
};

export const deleteWaterReq = async entryId => {
  const { data } = await axios.delete(`/water/delete-water/${entryId}`);
  return data;
};
// export const getTodaySumamryWaterReq = async (date) => {
//   const { data } = await axios.get(`/water/today/${date}`);
//   return data;

// };