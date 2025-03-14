
import axiosIns from '../axios/index.js'
import { toast } from 'react-toastify'

import { setLoaderState, setUserDetails } from '../redux/actions/index.js'
import config from '../Config/index.js'

const fetchMyDetails = () => {
    return (disptach) => {
        disptach(setLoaderState(true));
        axiosIns.get(`${config.nodeApiUrl}/api/user/userDetails`)
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                disptach(setUserDetails(res.data.data))
            }
        })
        .catch((err) => {
            toast.error(err.message)
        })
        .finally(() => {
            disptach(setLoaderState(false));
        })
    }
}

export default {
    fetchMyDetails,
}