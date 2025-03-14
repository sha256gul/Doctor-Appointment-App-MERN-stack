import './doc.css'

import patientAPIs from  '../../apis/patients.js'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'react-bootstrap';


const DoctorsComponent=(props)=>
{

    const disptach = useDispatch();
    const [docList, setDocList] = useState([]);
    const userDetails = useSelector(state => state.userDetails.details)


    useEffect(() => {
        console.log('9090as9ds')
        disptach(patientAPIs.fetchMyDocs(setDocList));
    }, []);


    const buildMyTable = () => {
        const list = [];
        docList.forEach((doc) => {
            list.push(
                <tr>
                    <td>{doc.name}</td>
                    <td>{doc.speciality}</td>
                    <td>{doc.education}</td>
                    <td>{doc.experience} years</td>
                </tr>
            );
        });

        return list;
    }

    const buildMyTableHeader = () => {

        return (
            <>
                        <th>Doctor</th>
                        <th>Speciality</th>
                        <th>Education</th>
                        <th>Experience</th>
            </>
        )
    }



    return (
        <div className="appointments-main-container">
            <h4>
                {
                    userDetails.user_type === 1 ? 'All Doctors' : 'My Doctors'
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
        </div>
    );
}

export default DoctorsComponent;