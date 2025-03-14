import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './menubar.css'


const MenuBarComponent=(props)=>
{
    const [isHover, setisHover] = useState(false);

    const userDetails = useSelector(state => state.userDetails.details)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setisHover(true);
    }

    const handleMouseOut = () => {
        setisHover(false);
    }


    useEffect(() => {
        console.log('userDetails',userDetails.user_type);
    }, [userDetails]);

    const gotoAppointments = () => {
        navigate('/home')
    }

    const gotoPatients = () => {
        navigate('/patients')
    }

    const gotoDoctors = () => {
        navigate('/doctors')
    }

    const bookAppointment = () => {
        navigate('/book')
    }

    return (
        <div onMouseLeave={handleMouseOut} onMouseEnter={handleMouseEnter} className={'menu-main-container'}>
            {
                isHover ? (
                    <>
                    { userDetails.user_type === 3 ? <label onClick={bookAppointment}>Book Appointment</label> : null}
                    <label onClick={gotoAppointments}>{userDetails.user_type === 3 ? 'My' : null} Appointments</label>
                    {userDetails.user_type !== 3 ?  <label onClick={gotoPatients}>{userDetails.user_type === 1 ? null : 'My'} Patients</label> : null}
                    {userDetails.user_type !== 2 ? <label onClick={gotoDoctors}>{userDetails.user_type === 1 ? null : 'My'}  Doctors</label> : null }
                    </>
                ) : (
                    <>
                     { userDetails.user_type === 3 ? <span className='appointment-icon'></span> : null}
                     <span className='my-appointment-icon'></span>
                     {userDetails.user_type !== 3 ?<span className='patients-icon'></span> : null }
                     {userDetails.user_type !== 2 ?<span className='doctors-icon'></span> : null }
                    </>
                )
            }
        </div>
    );
}

export default MenuBarComponent;