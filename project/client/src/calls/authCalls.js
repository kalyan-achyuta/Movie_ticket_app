import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export const register = async(values) => {
    try {
       const resposne = await api.post('/api/auth/register', values);
       return resposne.data;
    } catch (error) {
        return error;
    }
}
export const login = async(values) => {
    try {
       const resposne = await api.post('/api/auth/login', values);
       return resposne.data;
    } catch (error) {
        return error;
    }
}
export const getCurrentUser = async(values) => {
    try {
       const resposne = await api.post('/api/auth/current-user', {withCredentials: true});
       return resposne.data;
    } catch (error) {
        return error;
    }
}