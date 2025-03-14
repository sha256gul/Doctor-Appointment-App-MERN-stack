import './doc.css'

import docAPIs from  '../../apis/doctor.js'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'react-bootstrap';


const PateintsComponent=(props)=>
{

    const disptach = useDispatch();
    const [pList, setpList] = useState([]);
    const userDetails = useSelector(state => state.userDetails.details)


    useEffect(() => {
        disptach(docAPIs.fetchMyPat(setpList));
    }, []);

    console.log('9090as9ds', setpList)



    const buildMyTable = () => {
        const list = [];
        pList.forEach((p) => {
            list.push(
                <tr>
                    <td>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.city}</td>
                </tr>
            );
        });

        return list;
    }

    const buildMyTableHeader = () => {

        return (
            <>
                        <th>Patient Name</th>
                        <th>Phone</th>
                        <th>City</th>
            </>
        )
    }



    return (
        <div className="appointments-main-container">
            <h4>
            {
                    userDetails.user_type === 1 ? 'All Patients' : 'My Patients'
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

export default PateintsComponent;