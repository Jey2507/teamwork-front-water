import axios from '../../common/axiosConfig'

export const addWaterReq = async (arg) => {
    const { data } = await axios.post('/water', arg);
    return data;
}
export const getWaterDayReq = async (date) => {
    const { data } = await axios.get(`/water/daily/${date}`);
    return data;
  };

  export const getWaterMonthReq = async (date) => {
    const { data } = await axios.get(`/water/monthly/${date.year}/${date.month}`);
    return data;
  };
  
  export const getTodaySumamryWaterReq = async (date) => {
    const { data} = await axios.get (`/water/today/${date}`);
    return data;
  
  };