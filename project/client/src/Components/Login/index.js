import './login.css'
import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthAPIs from  '../../apis/auth.js';

const LoginComponent=(props)=>
{
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (type, e) => {
        if (!e.target) return console.log('Error, e.target not found');
        if (type === 'username') {
            setEmail(e.target.value);
        } else if (type === 'password') {
            setPassword(e.target.value);
        }
    }

    const gotoRegisteration = () => {
        navigate('/register');
    }

    const performLogin = (e) => {
        e.preventDefault();
        if (!email || !password) return console.log('Username password cannot be empty')
        const payload = {
            email: email,
            password: password,
        }
        dispatch(AuthAPIs.loginApi(payload, navigate));
    }


    return (
        <div className="login-main-container">
            <div className='login'>
                <h1> Login</h1>
                <Form className='login-form'>
                    <Form.Group className='login-form-group'>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                            onChange={(e) => { return handleChange('username', e)  }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            onChange={(e) => { return handleChange('password', e)  }}
                        />
                    </Form.Group>
                    <Button onClick={performLogin} type='submit' disabled={!email || !password}> Login </Button>
                </Form> 
                <label> New User ?</label>
                <label onClick={gotoRegisteration} className='register-link'> Register</label>
            </div>
        </div>
    );
}

export default LoginComponent;