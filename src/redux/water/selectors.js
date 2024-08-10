export const selectUser = (state) => state.auth.user;
export const selectTotalDayWater = (state) => state.water.totalDayWater;
export const selectWaterDate = (state) => state.water.items; 
export const selectWaterMonth = (state) => state.water.monthData;
export const selectDate = (state) => state.water.date;
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;