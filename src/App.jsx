import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    color: '#0366d6',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      setIsAuthenticated(true);
      checkFollowStatus(token);
    }
  }, []);

  // const handleLogin = () => {
  //   window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}/callback`;
  // };
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent('http://localhost:5173/callback')}`;
  };


  const handleCallback = async (code) => {
    try {
      const response = await axios.post('/api/auth/github/callback', { code });
      const { access_token } = response.data;
      localStorage.setItem('github_token', access_token);
      setIsAuthenticated(true);
      checkFollowStatus(access_token);
    } catch (error) {
      console.error('Authentication error:', error.response ? error.response.data : error.message);
      setError('Failed to authenticate with GitHub: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    }
  };

  const checkFollowStatus = async (token) => {
    try {
      const response = await axios.get(`https://api.github.com/user/following/${import.meta.env.VITE_BYTE_GITHUB_USERNAME}`, {
        headers: { Authorization: `token ${token}` }
      });
      setIsFollowing(response.status === 204);
    } catch (error) {
      setIsFollowing(false);
    }
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isFollowing ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return (
    <Router>
      <div style={styles.container}>
        <h1>GitHub OAuth Demo</h1>
        {error && <p style={styles.error}>{error}</p>}
        {!isAuthenticated ? (
          <button style={styles.button} onClick={handleLogin}>Login with GitHub</button>
        ) : isFollowing ? (
          <div>
            <p>You are following the BYTE GitHub Account</p>
            <a 
              href={`https://github.com/${import.meta.env.VITE_BYTE_GITHUB_USERNAME}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.link}
            >
              Visit BYTE GitHub Account
            </a>
          </div>
        ) : (
          <div>
            <p>Sorry, but you are not following BYTE. Please follow first.</p>
            <a 
              href={`https://github.com/${import.meta.env.VITE_BYTE_GITHUB_USERNAME}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.link}
            >
              Follow BYTE GitHub Account
            </a>
          </div>
        )}
        <Route path="/callback" render={({ location }) => {
          const code = new URLSearchParams(location.search).get('code');
          if (code) {
            handleCallback(code);
          }
          return <Redirect to="/" />;
        }} />
        <PrivateRoute path="/protected" component={() => <h2>Protected Content</h2>} />
      </div>
    </Router>
  );
};

export default App;