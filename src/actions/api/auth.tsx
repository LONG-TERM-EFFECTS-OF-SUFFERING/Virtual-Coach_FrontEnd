import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

export const jwt_verify: any = async (token: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ token });

    const response = await axios.post(`${api_url}/auth/jwt/verify/`, body, config);

    return response.data
}

export const jwt_create: any = async (email: string, password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    const response = await axios.post(`${api_url}/auth/jwt/create/`, body, config)

    return response.data
}

export const users_me: any = async () => {
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

export const users_put: any = async (name: string) => {
    const jwt_token = localStorage.getItem('access')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${jwt_token}`,
            'Accept': 'application/json'
        }
    }

    const body = JSON.stringify({ name })

    const response = await axios.put(`${api_url}/auth/users/me/`, body, config)

    return response.data
}

export const set_email: any = async (new_email: string, re_new_email: string, current_password: string) => {
    const jwt_token = localStorage.getItem('access')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${jwt_token}`,
            'Accept': 'application/json'
        }
    }

    const body = JSON.stringify({ new_email, re_new_email, current_password })

    try {
        const response = await axios.post(`${api_url}/auth/users/set_email/`, body, config)
        return { data: response.data, error: false }
    } catch (err: any) {
        return { data: err.response.data, error: true }
    }
}

export const set_password: any = async (new_password: string, re_new_password: string, current_password: string) => {
    const jwt_token = localStorage.getItem('access')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${jwt_token}`,
            'Accept': 'application/json'
        }
    }

    const body = JSON.stringify({ new_password, re_new_password, current_password })

    const response = await axios.post(`${api_url}/auth/users/set_password/`, body, config)

    return response.data
}