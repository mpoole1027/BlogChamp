// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if username and password are valid (you can replace this with your authentication logic)
    if (username === 'admin' && password === 'password') {
      // Redirect to the dashboard page after successful login
      navigate('/Post');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignUp = () => {
    // Check if username and password are valid (you can replace this with your authentication logic)
      // Redirect to the dashboard page after successful login
      navigate('/Post');
    
  };

  return (
    <div className = 'page'>

      <div className='title'>
        <h1> BlogChamp</h1>
      </div>

      <div className = 'container'>

        <div className='login'>

          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>

        </div>

        <div className='signup'>

          <h2>Sign Up</h2>
          <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>

        </div>
      </div>

    </div>

    
  );
};

export default Login;
