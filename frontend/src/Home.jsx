import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Our Website</h1>
      <p style={styles.description}>Join us today and explore amazing features!</p>
      <div style={styles.links}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
      </div>
    </div>
  );
};

const Login = () => (
  <div style={styles.page}>
    <h2 style={styles.pageHeader}>Login Page</h2>
    <p style={styles.pageDescription}>Please enter your credentials to log in.</p>
  </div>
);

const Signup = () => (
  <div style={styles.page}>
    <h2 style={styles.pageHeader}>Signup Page</h2>
    <p style={styles.pageDescription}>Create a new account to get started.</p>
  </div>
);

const App = () => {
  return (
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666',
  },
  links: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '200px',
  },
  link: {
    textDecoration: 'none',
    color: '#007BFF',
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
    border: '1px solid #007BFF',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  linkHover: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  pageHeader: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  pageDescription: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default Home;