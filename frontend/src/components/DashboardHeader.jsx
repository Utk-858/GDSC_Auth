import React from 'react';
import '../styles/dashboardHeader.css'

const DashboardHeader = ({ onViewProjects, onEditProjects, onDeleteProjects }) => {
    return (
        <div className="dashboard-header">
            <h1>Project Dashboard</h1>
            <div className="dashboard-actions">
                <button className="action-button" onClick={onViewProjects}>View Projects</button>
                <button className="action-button" onClick={onEditProjects}>Edit Projects</button>
                <button className="action-button delete-button" onClick={onDeleteProjects}>Delete Projects</button>
            </div>
        </div>
    );
};

export default DashboardHeader;