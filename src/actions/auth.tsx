import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
} from './types';

const api_url =import.meta.env.VITE_API_URL;

export const login = (email:string, password:string) => async (dispatch:any) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email,password});
    try {
        const response = await axios.post(`${api_url}/auth/jwt/create/`,body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
        dispatch(load_user());  
    }catch(err){
        dispatch({
            type: LOGIN_FAIL
        })
    }


}

export const load_user = () => async (dispatch:any) => {
    if (localStorage.getItem('access')) {
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const response = await axios.get(`${api_url}/auth/users/me/`,config);
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: response.data
            })
        
    } catch(err){
        dispatch({
            type: LOAD_USER_FAIL
        })
    }
} else {
    dispatch({
        type: LOAD_USER_FAIL
    })  
}
}
