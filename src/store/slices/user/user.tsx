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
            state = {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            }
        },
        loginUserFail: (state, action) => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');

            state = {
                ...state,
                refresh: null,
                access: null,
                isAuthenticated: false,
            }
        },
        loadUserSuccess: (state, action) => {
            const { payload } = action
            console.log(action)
            state = {
                ...state,
                isAuthenticated: true,
                user: payload,
            }
        },
        loadUserFail: (state) => {
            state = {
                ...state,
                isAuthenticated: false,
                user: null,
            }
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