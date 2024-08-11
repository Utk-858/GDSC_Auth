import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import adminEmails from './adminEmails';
import { useNavigate } from 'react-router-dom';

function Login() {    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userType === 'Admin' && adminEmails.includes(email)) {
            
            navigate('/dashboard',{ state: { email: email } });
            setError('Admin logged successfully')
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true);

            const requestData = {
                email,
                password: userType === 'Admin' ? undefined : password,
                userType
            };

            const { data } = await axios.post("/api/users/login", requestData, config);
            
            //console.log("hi")
            console.log(data);

            navigate('/dashboard',{ state: { email: email } });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);

        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Login</center></h2>
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
                    )}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;