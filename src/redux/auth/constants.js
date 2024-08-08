export const initialStateConstant = {
    user: {
        name: null,
        gender: null,
        avatar: null,
        weight: null,
        email: null,
        dailyTimeActivity: null,
        dailyNorma: null,
    },
    token: null,
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBlZThhZjZiNGYzODg3Mzc4MmI4NyIsImlhdCI6MTcyMzA0NzI0OSwiZXhwIjoxNzIzMTMzNjQ5fQ.MMePerhn9q1yI9PzLEBO4TbbtDiA80z55dXXHCVrvjs',
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}