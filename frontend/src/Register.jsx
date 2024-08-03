import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {    

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [captcha, setCaptcha] = useState('')
    const [error, setError] = useState('')
    const [captchaCode, setCaptchaCode] = useState(Math.floor(1000 + Math.random() * 9000))
    const [userType, setUserType] = useState('Student') 
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (userType !== 'Admin') {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            if (!validatePassword(password)) {
                setError('Password must be at least 8 characters, and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                return;
            }
        }

        if (captcha !== captchaCode.toString()) {
            setError('Invalid CAPTCHA');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email must be a valid LNMIIT email address (ending with @lnmiit.ac.in)');
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const requestData = {
                name,
                email,
                password: userType === 'Admin' ? undefined : password,
            };

            const { data } = await axios.post('/api/users/', requestData, config);

            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/login'); // redirect to login page
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleCaptchaChange = () => {
        setCaptchaCode(Math.floor(1000 + Math.random() * 9000))
    }

    const validateEmail = (email) => {
        const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@lnmiit.ac.in$");
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return passwordRegex.test(password);
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Sign Up</center></h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="userType">
                            <strong>User Type</strong>
                        </label>
                        <select className="form-control rounded-0" value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" 
                            placeholder='Enter Name' 
                            autoComplete='off' 
                            name='name' 
                            className='form-control rounded-0'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="text" 
                            placeholder='Enter Email' 
                            autoComplete='off' 
                            name='email' 
                            className='form-control rounded-0' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {userType !== 'Admin' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="password">
                                    <strong>Password</strong>
                                </label>
                                <input type="password" 
                                    placeholder='Enter Password' 
                                    name='password' 
                                    className='form-control rounded-0' 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword">
                                    <strong>Confirm Password</strong>
                                </label>
                                <input type="password" 
                                    placeholder='Confirm Password' 
                                    name='confirmPassword' 
                                    className='form-control rounded-0' 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="mb-3">
                        <label htmlFor="captcha">
                            <strong>CAPTCHA</strong>
                        </label>
                        <div className="d-flex">
                            <input type="text" 
                                placeholder='Enter CAPTCHA' 
                                name='captcha' 
                                className='form-control rounded-0 w-50'
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                            <span className="mx-2">{captchaCode}</span>
                            <button type="button" className="btn btn-secondary" onClick={handleCaptchaChange}>Refresh</button>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Register;