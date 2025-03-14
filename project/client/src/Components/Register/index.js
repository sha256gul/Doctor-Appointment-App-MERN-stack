import './register.css'
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthAPIs from '../../apis/auth.js'
import { useDispatch } from 'react-redux'
import DocAPI from '../../apis/doctor.js'
import { toast } from 'react-toastify'


const RegisterComponent=()=>
{
    const dispatch = useDispatch();

    const [passwordErr, setPasswordErr] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(3);
    const [specialityList, setSpecialityList] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState({ id:-1, name: 'Select Speciality' })

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        password: '',
        confPassword: '',
    })

    const [docDetails, setDocDetails] = useState({ education: '', experience: null })

    const navigate  = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(DocAPI.fetchSpeciality(setSpecialityList));
    }, []);



    const handleChange = (type, e) => {
        if (!e.target) return console.log('Error, e.target not found');
        if (type === 'phone') {
            let isValid = /^\d+$/.test(e.target.value);
            if (!isValid) return
        }
        if (type === 'password' || type === 'confPassword') setPasswordErr(false);
        const clone = Object.assign({}, userDetails);
        clone[type] = e.target.value;
        setUserDetails(clone);
    }


    const performRegisteration = (e) => {
        e.preventDefault();
        if (userDetails.password !== userDetails.confPassword) {
            setPasswordErr(true);
            return;
        }
        // API CALL
        const { username, email, address, phone, password, city } = userDetails
        const payload = {
            name: username,
            email: email,
            address: address,
            phone: phone,
            user_type: selectedUserType,
            password: password,
            city: city
        }
        if (selectedUserType === 2) {
            payload.education = docDetails.education;
            payload.experience = docDetails.experience
            if (selectedSpeciality.id > 0) {
                payload.speciality = selectedSpeciality.id;
            } else {
                return toast.error('Please select Speciality');
            }
        }
        dispatch(AuthAPIs.registerApi(payload, navigate));  
    }

    const gotoLogin = () => {
        navigate('/login')
    }

    const handleUserChange = (type) => {
        setSelectedUserType(type)
    }

    const handleSpecialitySelect = (item) => {
        console.log(item)
        setSelectedSpeciality(item)
    }

    const specialityDropdownList = () => {
        let list = [];
        specialityList.forEach((item) => {
            list.push(<Dropdown.Item key={item.id} onClick={() => { handleSpecialitySelect(item) }}>{item.name}</Dropdown.Item>);
        });
        return list;
    }

    const handleDocChange = (type, e) => {
        const clone = Object.assign({}, docDetails);
        clone[type] = e.target.value;
        setDocDetails(clone);
    }


    return (
        <div className="register-main-container">
            <div className='register'>
                <h1> Register</h1>
                <Form className='register-form' onSubmit={performRegisteration}>
                    <h4>Registering as:</h4>
                    <Form.Group className='user-option'>
                        <Form.Check
                            type="radio"
                            label="Patient"
                            name='user-type'
                            id="user-type-1"
                            checked
                            onClick={() => { handleUserChange(3); }}
                        />
                        <Form.Check
                            type="radio"
                            label="Doctor"
                            name='user-type'
                            id="user-type-2"
                            onClick={() => { handleUserChange(2); }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Full Name
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='text'
                            id='text'
                            className='fullname'
                            placeholder='Full Name'
                            required
                            onChange={(e) => { return handleChange('username', e)  }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                            required
                            onChange={(e) => { return handleChange('email', e)  }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Phone Number (10 digits)
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='number'
                            id='number'
                            maxLength={10}
                            minLength={10}
                            value={userDetails.phone}
                            placeholder='Number'
                            required
                            onChange={(e) => { return handleChange('phone', e)  }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Address
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='text'
                            id='text'
                            placeholder='Address'
                            required
                            onChange={(e) => { return handleChange('address', e)  }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            City
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='text'
                            id='text'
                            placeholder='City'
                            required
                            onChange={(e) => { return handleChange('city', e)  }}
                        />
                    </Form.Group>
                    {
                        selectedUserType === 2 ? (
                        <>
                            <Form.Group>
                                <Form.Label>
                                    Experience
                                </Form.Label>
                                <Form.Control
                                    type='number'
                                    name='experience'
                                    id='experience'
                                    placeholder='Experience'
                                    required
                                    onChange={(e) => { return handleDocChange('experience', e)  }}
                                />
                            </Form.Group>
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
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Education
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='education'
                                    id='education'
                                    placeholder='Education'
                                    required
                                    onChange={(e) => { return handleDocChange('education', e)  }}
                                />
                            </Form.Group>
                        </>
                        ) : null
                    }
                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            required
                            minLength={7}
                            onChange={(e) => { return handleChange('password', e)  }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            required
                            minLength={7}
                            className="conf-pass"
                            onChange={(e) => { return handleChange('confPassword', e)  }}
                        />
                        {
                            passwordErr ? (<p className='password-error'>Password does not match</p>) : null
                        }
                    </Form.Group>
                    <Button type='submit'> Register </Button>
                    <div className='redirect'>
                        <label> Existing User ?</label>
                        <label onClick={gotoLogin} className='register-link'> Login</label>
                    </div>
                </Form> 
            </div>
        </div>
    );
}

export default RegisterComponent;