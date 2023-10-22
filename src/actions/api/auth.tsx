import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

export const jwt_verify:any = async (token:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ token });

    const response = await axios.post(`${api_url}/auth/jwt/verify/`, body, config);
    
    return response.data
}

export const jwt_create:any = async (email:string, password:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    const response = await axios.post(`${api_url}/auth/jwt/create/`, body, config)

    return response.data
}

export const users_me:any = async () => {
    const jwt_token = localStorage.getItem('access')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${jwt_token}`,
            'Accept': 'application/json'
        }
    }
    const response = await axios.get(`${api_url}/auth/users/me/`, config)

    return response.data
}