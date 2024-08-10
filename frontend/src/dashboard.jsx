import React from 'react';
import DashboardHeader from './components/DashboardHeader'
import DashboardPage from './dashboardPage';

const handleEditProjects = async(e) =>{
    e.preventDefault();

};

const handleViewProjects = async(e) =>{
    e.preventDefault();
};

const handleDeleteProjects = async(e) =>{
    e.preventDefault();
};

const Dashboard = () => {
    return (
        <div>
            <DashboardHeader 
                onViewProjects={handleViewProjects}
                onEditProjects={handleEditProjects}
                onDeleteProjects={handleDeleteProjects}
            />
            <DashboardPage />
        </div>
    );
};

export default Dashboard;