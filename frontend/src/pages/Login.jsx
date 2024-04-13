// Login.jsx

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const fetchUserByUsername = (username) => {
      return fetch(`http://localhost:4000/api/users/username/${username}`)
    }

    // Here you can implement your login logic, like sending a request to your backend
    // For simplicity, let's just check if username and password are not empty
    if (username && password) {
      try {
        const response = await fetchUserByUsername(username)
        const user = await response.json()

        if (response.ok) {
          if (user) {
            console.log('User found: ', user.username)
            console.log('Login successful!')
          } else {
            setErrorMessage('User not found. Please enter a valid username.')
          }
        } else {
          setErrorMessage('Error fetching user data. Please try again later.')
        }
      } catch (error) {
        console.error('Error fetching user: ', error)
        setErrorMessage('An error occured. Please try again later. ')
      }
    } else {
      setErrorMessage('Please enter both username and password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;