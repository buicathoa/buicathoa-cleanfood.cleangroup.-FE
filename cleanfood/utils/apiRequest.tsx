import axios, { Axios } from "axios"
import { BASE_URL } from "../constants"
import Cookies from 'js-cookie';

export const apiRequest = (url: string, payload: any, type: string) => {
    const headers = {
        'Content-Type': type === 'general' ? 'application/json;charset=UTF-8' : 'multipart/form-data',
        'Authorization': Cookies.get('docu_token') ? `Bearer ${Cookies.get('docu_token')}` : '',
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
    }
    return axios.post(`${BASE_URL}/${url}`, payload,
        { headers: headers },
    )
        .then((res => {
            return res.data
        }))
        .catch(err => ({ err }))
} 