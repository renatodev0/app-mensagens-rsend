import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
    autoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action
      state.token = payload.token
      state.userData = payload.userData
      state.autoLogin = true
    },
    setAutoLogin: (state, action) => {
      state.autoLogin = true
    },
    logout: (state, action) => {
      state.token = null
      state.userData = null
      state.autoLogin = false
    },
  },
})

export const autoLogin = authSlice.actions.setAutoLogin
export const authenticate = authSlice.actions.authenticate
export const logout = authSlice.actions.logout
export default authSlice.reducer
