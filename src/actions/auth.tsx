import { loadUserFail, loadUserSuccess, loginUserFail, loginUserSuccess, logoutUser } from '../store/slices/user/user'
import { AppDispatch } from '../store/store';
import { jwt_create, jwt_verify, users_me } from './api/auth';

export const login: any = (email: string, password: string) => async (dispatch: AppDispatch) => {

    try {
        const response = await jwt_create(email, password)
        dispatch(loginUserSuccess(response))
        dispatch(load_user())
        return { data: response.data, error: false }
    } catch(err:any) {
        dispatch(loginUserFail())
        return { data: err.response.data, error: true }
    }
}

export const load_user: any = () => async (dispatch: any) => {
    if (localStorage.getItem('access')) {
        try {
            const data = await users_me()
            dispatch(loadUserSuccess(data))
        } catch {
            dispatch(loadUserFail())
        }
    } else {
        dispatch(loadUserFail())
    }
}

export const verify_user = async (token: string) => {

    if (token == null) return false

    try {
        await jwt_verify(token)
        console.log("Token Valido")
        return true;
    } catch {
        console.log("Token Invalido")
        return false;
    }
}

export const logout = () => (dispatch: any) => {
    dispatch(logoutUser())
}
