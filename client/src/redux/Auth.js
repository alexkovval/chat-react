import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: {},
    token: ''
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.user = action.payload
    },
    token: (state, action) => {
      state.token = action.payload
    },
    register: (state, action) => {
      state.user = action.payload
    },
    changeIsLogged: (state, action) => {
      state.isLoggedIn = action.payload
    },
    login: (state, action) => {
        state.user = action.payload;   
    },
  },
})

export const { getUsers,token,register,login,changeIsLogged } = AuthSlice.actions

export default AuthSlice.reducer