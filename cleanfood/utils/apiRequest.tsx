import axios, { Axios } from "axios"
import { BASE_URL } from "../constants"
import Cookies from 'js-cookie';

export const apiRequest = (url: string, payload: any, type:string) => {
    return axios.post(`${BASE_URL}/${url}`, payload, {headers: { Authorization: `Bearer ${Cookies.get('docu_token')}`, 'content-type': type === 'general' ? 'application/json' : 'multipart/form-data' }}, )
    .then((res => {
        return res.data
    }))
    .catch(err => ({err}))
} 