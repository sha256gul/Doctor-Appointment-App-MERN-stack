
import axiosIns from '../axios/index.js'
import { toast } from 'react-toastify'

import { setLoaderState, setUserDetails } from '../redux/actions/index.js'
import config from '../Config/index.js'

const fetchSlotInfo = (setAllSlots, selectedDoctor, selectedDate) => {
    return (disptach) => {
        disptach(setLoaderState(true));
        axiosIns.put(`${config.nodeApiUrl}/api/patient/slots`, {  doc_id: selectedDoctor.id, selectedDate })
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                setAllSlots(res.data.data.allSlots);
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

const bookApp = (data, navigate, fetchSlots, setSelectedSlot) => {
    return (disptach) => {
        disptach(setLoaderState(true));
        axiosIns.post(`${config.nodeApiUrl}/api/patient/book`, data)
        .then((res) => {
            if (res.data.success === false) {
                if (res.data.fetch_slot_api === true) {
                    toast.info(res.data.message);
                    setSelectedSlot(null);
                    fetchSlots()
                }
                else toast.error(res.data.message)
            } else {
                toast.success('Your Appointment has been booked.')
                navigate('/home')
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

const fetchMyAppointments = (setAppointments) => {
    return (disptach) => {
        disptach(setLoaderState(true));
        axiosIns.get(`${config.nodeApiUrl}/api/patient/appointments`)
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                setAppointments(res.data.data);
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

const cancelAppointment = (id, setAppointments, closeModal) => {
    return (disptach) => {
        disptach(setLoaderState(true));
        axiosIns.put(`${config.nodeApiUrl}/api/patient/appointments/cancel/${id}`)
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                closeModal()
                toast.success('Appointment cancelled successfully.')
                return disptach(fetchMyAppointments(setAppointments));
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

const fetchMyDocs = (setAction) => {
    return (disptach) => {
        disptach(setLoaderState(true));
        axiosIns.get(`${config.nodeApiUrl}/api/patient/myDoctors`)
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                setAction(res.data.data);
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
    fetchSlotInfo,
    bookApp,
    fetchMyAppointments,
    cancelAppointment,
    fetchMyDocs
}