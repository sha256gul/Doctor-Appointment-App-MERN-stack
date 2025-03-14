
import { toast } from 'react-toastify'
import axiosIns from '../axios/index.js';
import { setLoaderState } from '../redux/actions/index.js'
import config from '../Config/index.js';



const registerApi = (payload, navigate) => {
    return (dispatch) => {
    dispatch(setLoaderState(true));
    axiosIns.post(`${config.nodeApiUrl}/api/auth/register`, payload)
        .then((res) => { 
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success('Registration successfull');
                navigate('/login')
            }
         })
        .catch(err => {
            toast.error(err.message);
        })
        .finally(() => {
            dispatch(setLoaderState(false));
        })
    }
}

const loginApi = (payload, navigate) => {
    return (dispatch) => {
        dispatch(setLoaderState(true));
        axiosIns.post(`${config.nodeApiUrl}/api/auth/login`, payload)
            .then((res) => { 
                if (res.data.success === false) {
                    toast.error(res.data.message)
                } else {
                    if (res.data.data.token) {
                        localStorage.setItem('token', res.data.data.token)
                        toast.success('Login successfull');
                        navigate('/home')
                    } else toast.error('Error while log-in');
                }
             })
            .catch(err => {
                toast.error(err.message);
            })
            .finally(() => {
                dispatch(setLoaderState(false));
            })
        }
}

export default {
    registerApi,
    loginApi
}