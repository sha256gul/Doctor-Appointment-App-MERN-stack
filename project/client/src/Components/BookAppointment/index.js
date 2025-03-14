

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import docAPIs from '../../apis/doctor.js'
import patientAPIs from  '../../apis/patients.js'
import {Form, Dropdown, Button} from  'react-bootstrap'
import DoctorCard from './doctorCard.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


import './book.css'

const BookAppComponent=(props)=>
{
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const navigate  = useNavigate();

    const [specialityList, setSpecialityList] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState({ id:-1, name: 'Select Speciality' })
    const [doctorsList, setDocList] = useState([]);
    const [docListBasedOnSpeciality, setDocListSpeciality] = useState([]);
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);


    useEffect(() => {
        return (() => {
            setSelectedSpeciality({ id:-1, name: 'Select Speciality' })
            setSelectedDoctor(null);
            setSelectedDate(date)
            setSelectedSlot(null)
        })
    }, []);

    const [allSlots, setAllSlots] = useState([]);

    const docListReducer = useSelector(state => state.doc.docList);
    

    useEffect(() => {
        setDocList(docListReducer);
    }, [docListReducer]);

    useEffect(() => {
        setSelectedDoctor(null)
        setSelectedDate(date);
        setSelectedSlot(null);
    }, [selectedSpeciality]);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(docAPIs.fetchSpeciality(setSpecialityList))
        dispatch(docAPIs.fetchDoctors())
    }, []);

    useEffect(() => {
        setSelectedSlot(null)
        if (selectedDoctor && selectedDate) dispatch(patientAPIs.fetchSlotInfo(setAllSlots, selectedDoctor, selectedDate));
    }, [selectedDate, selectedDoctor, selectedSpeciality]);

    const handleSpecialitySelect = (item) => {

        setSelectedSpeciality(item)

        if (doctorsList.length) {
            let list = [];
            list = doctorsList.filter((doc) => {
                if (doc.speciality === item.id) return true;
            });
            setDocListSpeciality(list);
        }
    }


    const specialityDropdownList = () => {
        let list = [];
        specialityList.forEach((item) => {
            list.push(<Dropdown.Item key={item.id} onClick={() => { handleSpecialitySelect(item) }}>{item.name}</Dropdown.Item>);
        });
        return list;
    }

    const selectSlot = (e,slot) => {
        e.preventDefault()
        setSelectedSlot(slot);
    }

    const displaySlots = () => {
        //selectedSlot
        const list = [];

        allSlots.forEach((slot) => {
            let slotClass = 'not-available';
            if (slot.available === true) slotClass = 'available';
            if (selectedSlot && (selectedSlot.id === slot.id)) slotClass = 'selected-slot'
            list.push(
                <button title={slotClass === 'not-available' ? 'Booked' : null } disabled={slot.available !== true} onClick={(e) => { selectSlot(e,slot) }} className={slotClass}>
                    {slot.from} {slot.meridiem} - {slot.to} {slot.id === 4 ? 'PM' : slot.meridiem}
                </button>
            );            
        })
        return list;
    }

    const isWeekday = (date) => {
        const day = date.getDay(date);
        return day !== 0;
      };

    const fetchUpdatedSlots = () => {
     dispatch(patientAPIs.fetchSlotInfo(setAllSlots, selectedDoctor, selectedDate));
    }

    const bookAppointmentHandle = () => {
        if (selectedDoctor === null) return toast.error('Please select a doctor.');
        if (selectedSlot === null) return toast.error('Please select a slot.');
        const payload = {
            doc_id: selectedDoctor.id,
            date: selectedDate,
            slot_id: selectedSlot.id
        }
        dispatch(patientAPIs.bookApp(payload, navigate, fetchUpdatedSlots, setSelectedSlot));
    }

    return (
        <div className="booking-main-container">
            <div className="heading"> Book an Appointment</div>
            <div>
            <Form className='booking-form'>
            <Form.Group>
                <Form.Label>
                    Speciality
                </Form.Label>
                <Dropdown className='speciality-dropdown'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedSpeciality.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {specialityDropdownList()}
                    </Dropdown.Menu>
                    </Dropdown>
                    {
                        selectedSpeciality.id !== -1 ? (
                            
                                (docListBasedOnSpeciality.length) ? (
                                    <>
                                        <DoctorCard setSelectedDoctor={setSelectedDoctor} selectedSpeciality={selectedSpeciality} list={docListBasedOnSpeciality} />
                                        <div>
                                            <br/>
                                            <label>Select Date</label>
                                            <DatePicker
                                                disabled={selectedDoctor === null}
                                                selected={selectedDate}
                                                onChange={(date) => { setSelectedDate(date); }}
                                                popperPlacement="top"
                                                minDate={date}
                                                filterDate={isWeekday}
                                                />
                                        </div>
                                        <div className='slots'>
                                            Select Slot
                                            <div>
                                                {
                                                 displaySlots()
                                                }
                                            </div>
                                        </div>
                                        <Button onClick={bookAppointmentHandle} className='book-app-button'> Book Appointment</Button>
                                    </>
                                ) : (
                                    <div className='no-doc'>
                                        No doctor found.
                                    </div>
                                )
                            
                            
                        ) : null
                    }
            </Form.Group>
            </Form>
            </div>
            
        </div>
    );
}

export default BookAppComponent;