export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectIsLoggegIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectDailyNorma = (state) => state.auth.user.dailyNorma;
// export const selectDailyNorma = (state) => state.auth.user.dailyNorma;