import axios from '../../common/axiosConfig'

export const addWaterReq = async (arg) => {
  const { data } = await axios.post('/water/add-water', arg);
  return data;
}
export const getWaterDayReq = async (date) => {
  const { data } = await axios.get(`/water/daily-water`, date);
  console.log(data)
  return data;
};

export const getWaterMonthReq = async (date) => {
  const { data } = await axios.get(`/water/monthly-water`, date);
  return data;
};
