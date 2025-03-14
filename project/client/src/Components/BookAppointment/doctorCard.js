
import { useEffect, useState } from 'react';
import './card.css'
import checkmark from '../../resources/check.png'

function DoctorCard (props) {

    const [docSelected, setDocSelected] = useState(false);

    const selectDoc = (doc) => {
        console.log(doc)
        props.setSelectedDoctor(doc);
        setDocSelected(doc.id);
    }

    useEffect(() => {
        setDocSelected(false)
    }, [props.selectedSpeciality]);

    const makeList = () => {
        const template = [];
        props.list.forEach((doc) => {
            template.push(
                <div className="card" onClick={() => { selectDoc(doc) }}>
                    {
                        docSelected === doc.id ? (
                            <img src={checkmark} />
                        ) : null
                    }
                    <label>{doc.name}</label>
                    <label>{doc.education}</label>
                    <label>Experience: {doc.experience} Years</label>
                </div>
            );
        });
        return template;
    }

    return (
        <div className="doc-cards">
            {
                makeList()
            }
        </div>
    )
}

export default DoctorCard;