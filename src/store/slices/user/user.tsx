import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    access: any,
    refresh: any,
    isAuthenticated: any,
    user: any
}

const initialState: UserState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUserSuccess: (state, action) => {
            const { payload } = action
            localStorage.removeItem('access');
            localStorage.setItem('access', payload.access)

            state.isAuthenticated = true
            state.access = payload.access
            state.refresh = payload.refresh
        },
        loginUserFail: (state) => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');

            state.refresh = null
            state.access = null
            state.isAuthenticated = false
        },
        loadUserSuccess: (state, action) => {
            const { payload } = action

            state.isAuthenticated = true
            state.user = payload
        },
        loadUserFail: (state) => {
            state.isAuthenticated = false
            state.user = null
        }

    }
})

export const {
    loginUserSuccess,
    loginUserFail,
    loadUserSuccess,
    loadUserFail,
} = userSlice.actions

export default userSlice.reducer