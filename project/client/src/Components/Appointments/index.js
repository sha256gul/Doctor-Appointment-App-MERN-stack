import './appointments.css'

import patientAPIs from  '../../apis/patients.js'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'react-bootstrap';


const AppointmentsComponent=(props)=>
{

    const disptach = useDispatch();

    const userDetails = useSelector(state => state.userDetails.details)


    const [appointments, setAppointments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [cancelAppDetails, setCancelAppDetails] = useState(null);

    useEffect(() => {
        disptach(patientAPIs.fetchMyAppointments(setAppointments));
    }, []);

    const cancelApphandler = (app) => {
        setCancelAppDetails(app);
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const cancelApp = () => {
        disptach(patientAPIs.cancelAppointment(cancelAppDetails.id, setAppointments, closeModal))
    }

    const buildMyTable = () => {
        const list = [];
        appointments.forEach((app) => {
            let status = 'Booked';
            if (app.app_status === 2) status  = 'Completed';
            else if (app.app_status ===3) status = 'Cancelled';

            let dop = (typeof app.date_of_appointment === 'string') ? app.date_of_appointment.split('T')[0] : '--';
            let dcreated = (typeof app.date_created === 'string') ? app.date_created.split('T')[0] : '--';

            let name = app.user_name || '--';
            if (userDetails.user_type ===1) {
                name = app.doc_name || '--'
            }

            list.push(
                <tr>
                    <td>{name}</td>
                    {
                        userDetails.user_type === 1 ? <td>{app.patient_name || '--'}</td> : null
                    }
                    <td>{dop}</td>
                    <td>{app.from} {app.meridiem} to {app.to} {app.meridiem}</td>
                    <td>{status}</td>
                    <td>{dcreated}</td>
                    {
                            [1,2].includes(userDetails.user_type) ? null : (
                                <td>
                                {
                                    app.app_status ===1 ? (
                                        <Button onClick={() => { cancelApphandler(app) }} > Cancel </Button>
                                    ) : null
                                }
                            </td>
                            )
                    }
                   
                </tr>
            );
        })

        return list;
    }

    const buildMyTableHeader = () => {
        let user = 'Users'
        if (userDetails.user_type === 2) user = 'Patient'
        else if (userDetails.user_type === 3) user = 'Doctor'
        else if (userDetails.user_type === 1) user = 'Doctor'

        return (
            <>
                        <th>{user}</th>
                        {
                            userDetails.user_type ===1 ? (<th>Patient</th>) : null
                        }
                        <th>Appointment Date</th>
                        <th>Slot</th>
                        <th>Status</th>
                        <th>Booked On date</th>
                        {
                            [1,2].includes(userDetails.user_type) ? null : <th>Actions</th>
                        }
            </>
        )
    }

    const modalCode = () => {
        return (
            <Modal
                show={openModal}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
                centered
            >
            <Modal.Header closeButton>
            <Modal.Title>Cancel Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure, you want to cancel the Appointment ?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
                No
            </Button>
            <Button onClick={cancelApp} variant="primary">Yes</Button>
        </Modal.Footer>
      </Modal>
        )
    }


    return (
        <div className="appointments-main-container">
            <h4>
                {
                    userDetails.user_type === 1 ? 'All Appointments' : ' My Appointments'
                }
           
            </h4>
            
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        {buildMyTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {buildMyTable()}
                    </tbody>
                </Table>
            </div>
            {modalCode() }
        </div>
    );
}

export default AppointmentsComponent;