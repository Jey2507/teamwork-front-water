import axios from '../../common/axiosConfig'

export const addWaterReq = async (arg) => {
    const { data } = await axios.post('/water', arg);
    return data;
}
