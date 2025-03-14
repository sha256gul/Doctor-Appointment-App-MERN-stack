import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './topbar.css'
import UserAPIs from '../../apis/user.js'


const TopBarComponent=(props)=>
{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSettings, setshowSettings] = useState(false);
    const [name, setName] = useState('--')

    const userDetails = useSelector((state) => state.userDetails.details);
    useEffect(() => {
        if (userDetails && userDetails.name) {
            setName(userDetails.name)
        }
    }, [userDetails]);

    useEffect(() => {
        dispatch(UserAPIs.fetchMyDetails());
    }, []);

    const toggleShowSettings = () => {
        setshowSettings(!showSettings);
    }
    const closeSettings = () => {
        setshowSettings(false);
    }
    
    const signOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const gotoHome = () => {
        navigate('/home');
    }

    const gotoBooking = () => {
        navigate('/book');
    }

    return (
        <div className="topbar-main-container">
            <div onClick={gotoHome} className='app-icon'>
            </div>
            <label className='welcome'>
                Welcome {name} 
                {
                    userDetails.user_type === 3 ? (<span onClick={gotoBooking} className='goto-book'> Book an appointment </span>) : null
                }
            </label>
            <div onClick={toggleShowSettings} className='my-actions'>
                <label>{ name && name.split('')[0] }</label>
            </div>
            {
                showSettings === true ? (
                    <div onMouseLeave={closeSettings} className='settings'>
                        <label>My Account</label>
                        <label className='line-break' />
                        <label onClick={signOut}>Sign out</label>
                    </div>
                ) : null
            }
        </div>
    );
}

export default TopBarComponent;