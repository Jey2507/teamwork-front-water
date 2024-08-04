export const initialState = {
    selectedDate: new Date().toISOString().split('T')[0],
    selectedDateData: [],
    errorDay: null,
    isLoadingDay: false,
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    },
    monthData: [],
    errorMonth: null,
    isLoadingMonth: false,
    toggleInfo: true,
    waterDay: [],
    percentDay: null,
    isLoadingWaterDay: false,
    errorWaterDay: null,
    entries: [],
    loading: false,
    error: null,
};
/* 
    waterProgress: 0,
    calendarItems: [],
 */

