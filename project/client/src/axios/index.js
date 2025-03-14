

import axios from "axios";
import { toast } from 'react-toastify';

const instace = axios.create();

instace.interceptors.response.use((resp) => {
    if (resp.data.code == 401) {
        toast.info('Your session has expired. Please login again')
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return new Promise((res, rej) => { res({ data: [] }) });
    }
    return resp;
});

instace.interceptors.request.use((request) => {
    let token = localStorage.getItem('token')
    if (token) {
        request.headers = {
            Authorization: token
        }
    }
    return request;
});

export default instace;