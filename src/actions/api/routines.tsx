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

export const get_exercises: any = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try{
        const response = await axios.get(`${api_url}/routines/api/exercise/`, config)
        return { data: response.data, error: false }
    }
    catch(err: any){
        return { data: err.response.data, error: true }
    }
}

export const create_user_routine: any = async (user:number, routine:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({user, routine})
    try{
        const response = await axios.post(`${api_url}/routines/api/User_has_Routine/`, body, config)
        return { data: response.data, error: false }
    }
    catch(err: any){
        return { data: err.response.data, error: true }
    }
}