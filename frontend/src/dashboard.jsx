import React from 'react';
import DashboardHeader from './components/DashboardHeader'
import DashboardPage from './dashboardPage';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {

    const location = useLocation();
    const { email } = location.state || {};

    const navigate = useNavigate(); 

    const handleEditProjects = (e) =>{
        e.preventDefault();

    };

    const handleViewProjects = async(e) =>{
        e.preventDefault();
        navigate('/viewProjects',{ state: { email: email } })
    };

    const handleDeleteProjects = (e) =>{
        e.preventDefault();
    };

    return (
        <div>
            <DashboardHeader 
                onViewProjects={handleViewProjects}
                onEditProjects={handleEditProjects}
                onDeleteProjects={handleDeleteProjects}
            />
            <DashboardPage userEmail={email} />
        </div>
    );
};

export default Dashboard;