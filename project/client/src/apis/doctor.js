



import { toast } from 'react-toastify'
import axiosIns from '../axios/index.js';
import { setLoaderState, setDocList, setSpecialityList } from '../redux/actions/index.js'
import config from '../Config/index.js';



const fetchSpeciality = (setSpecialityList) => {
    return (dispatch) => {
        dispatch(setLoaderState(true));
        axiosIns.get(`${config.nodeApiUrl}/api/doctor/speciality`)
            .then((res) => { 
                if (res.data.success === false) {
                    toast.error(res.data.message)
                } else {
                    setSpecialityList(res.data.data)
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

const fetchDoctors = () => {
    return (dispatch) => {
        dispatch(setLoaderState(true));
        axiosIns.get(`${config.nodeApiUrl}/api/user?user_type=2`)
            .then((res) => { 
                if (res.data.success === false) {
                    toast.error(res.data.message)
                } else {
                    dispatch(setDocList(res.data.data));
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

const fetchMyPat = (setAction) => {
    return (dispatch) => {
        dispatch(setLoaderState(true));
        axiosIns.get(`${config.nodeApiUrl}/api/doctor/myPatients`)
            .then((res) => { 
                if (res.data.success === false) {
                    toast.error(res.data.message)
                } else {
                    setAction(res.data.data);
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
    fetchSpeciality,
    fetchDoctors,
    fetchMyPat
}