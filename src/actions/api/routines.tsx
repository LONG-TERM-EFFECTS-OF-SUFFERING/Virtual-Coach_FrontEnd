import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

export const user_routines: any = async (email:string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            depth: 1
        }
    }
    try{
        const response = await axios.get(`${api_url}/routines/api/get-user-routines/${email}`, config)
        return { data: response.data, error: false }
    }
    catch(err: any){
        return { data: err.response.data, error: true }
    }
}