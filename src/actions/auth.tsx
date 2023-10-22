import { loadUserFail, loadUserSuccess, loginUserFail, loginUserSuccess, logoutUser } from '../store/slices/user/user'
import { AppDispatch } from '../store/store';
import { LoginType } from '../interfaces/auth';
import { jwt_create, jwt_verify, users_me } from './api/auth';

export const login: LoginType = (email: string, password: string) => async (dispatch: AppDispatch) => {

    try {
        const data = await jwt_create(email, password)
        dispatch(loginUserSuccess(data))
        dispatch(load_user())
    } catch {
        dispatch(loginUserFail())
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
