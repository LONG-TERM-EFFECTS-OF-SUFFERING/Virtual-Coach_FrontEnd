import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

export const jwt_verify:any = async (token:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ token });
    
    return await axios.post(`${api_url}/auth/jwt/verify/`, body, config);
}