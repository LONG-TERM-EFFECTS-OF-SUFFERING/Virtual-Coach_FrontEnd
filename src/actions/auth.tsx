import axios from 'axios';


import { loadUserFail, loadUserSuccess, loginUserFail, loginUserSuccess, logoutUser } from '../store/slices/user/user'
import { AppDispatch } from '../store/store';
import { LoginType } from '../interfaces/auth';

const api_url = import.meta.env.VITE_API_URL;

export const login: LoginType = (email: string, password: string) => async (dispatch: AppDispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    await axios
        .post(`${api_url}/auth/jwt/create/`, body, config)
        .then((response) => {
            dispatch(
                loginUserSuccess(response.data)
            )
            dispatch(load_user())
        })
        .catch((err) => {
            console.log(err)
            dispatch(
                loginUserFail()
            )
        })

}

export const load_user = () => async (dispatch: any) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        await axios
            .get(`${api_url}/auth/users/me/`, config)
            .then((response) => {
                dispatch(
                    loadUserSuccess(response.data)
                )
            })
            .catch((err) => {
                console.log(err)
                dispatch(loadUserFail())
            })
    } else {
        dispatch(loadUserFail())
    }
}

export const verify_user = async (token: string) => {
    
    if(token == null) return false

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ token });

    try {
        const response = await axios.post(`${api_url}/auth/jwt/verify/`, body, config);
        console.log(response)
        return true;
    } catch (err) {
        return false;
    }
}

export const logout = () => (dispatch: any) => {
    dispatch(logoutUser())
}
