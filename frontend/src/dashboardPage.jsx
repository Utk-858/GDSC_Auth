import React, { useState } from 'react';
import '../src/styles/dashboard.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const DashboardPage = ({userEmail}) => {
    const [projectName, setProjectName] = useState('');
    const [repositoryLink, setRepositoryLink] = useState('');

    const [thumbnail, setThumbnail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('')

    const location = useLocation();
    const { email } = location.state || {};

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const requestData = {
                projectName,
                repositoryLink,
                email,
            };
            
            const {note}  = await axios.post('/api/users/dashboard', requestData,config);
            alert('hi')
            console.log(note);
            localStorage.setItem("userInfo", JSON.stringify(note));
            setSuccessMessage("Project added successfully!");

        } catch (error) {
            setError(error.response.data.message);
        }

        setProjectName('');
        setRepositoryLink('');
        setThumbnail(null);
    };

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    return (
        <div className="add-project-form">


            <h2>Add New Project</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="repositoryLink">GitHub Repository Link:</label>
                    <input
                        type="url"
                        id="repositoryLink"
                        value={repositoryLink}
                        onChange={(e) => setRepositoryLink(e.target.value)}
                        required
                    />
                </div>


                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email" // changed from "url" to "email"
                    id="Email"
                    value={email} // set the fixed value
                    required
                />
                </div>
                <button type="submit" className="submit-button">Add Project</button>
            </form>
        </div>
    );
};

export default DashboardPage;