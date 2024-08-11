import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import adminEmails from './adminEmails';

const ViewProjects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/users/projects");

        if (adminEmails.includes(email)) {
          setProjects(data);
        } else {
          const specificEmail = email; 
          const filteredData = data.filter((project) => project.email === specificEmail);
  
          setProjects(filteredData.length > 0 ? filteredData : []);
        }
        
        setLoading(false);
      } catch (error) {
        setError("Failed to load projects.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, [email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      setError("Failed to delete the project.");
    }
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>Projects</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9"
            }}
          >
            <h3 style={{ margin: "0 0 5px 0", color: "#007BFF" }}>{project.projectName}</h3>
            <p style={{ margin: 0 }}>
              <a
                href={project.gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007BFF", textDecoration: "none" }}
              >
                {project.gitRepoLink}
              </a>
            </p>
            <button 
              onClick={() => handleDelete(project.id)} 
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#FF4136",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProjects;