// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    const fetchUserByUsername = (username) => {
      return fetch(`http://localhost:4000/api/users/username/${username}`)
    }
    // Check if username and password are valid (you can replace this with your authentication logic)
    if (username && password) {
      try {
        const response = await fetchUserByUsername(username)
        const user = await response.json()

        if (response.ok) {
          if (user) {
            console.log('User found: ', user.username)
            console.log('Login successful!')
            navigate('/Post');
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

  const handleSignUp = async () => {
    const addUser = (username, password) => {
      const userData = {
        username: username,
        password: password,
        age: 0,
        bio: "Enter your bio here!",
        email: "test123@nau.edu"
      }
      console.log(JSON.stringify(userData))
      return fetch(`http://localhost:4000/api/users/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    }
    if (newUsername && newPassword) {
      try {
        const response = await addUser(newUsername, newPassword)
        if (response.ok) {
            console.log('User created: ', username)
            console.log('Signup successful!')
            navigate('/Post');
        } else {
          setErrorMessage('Error saving user data. Please try again later.')
        }
      } catch (error) {
        console.error('Error adding user: ', error)
        setErrorMessage('An error occured. Please try again later. ')
      }
    } else {
      setErrorMessage('Please enter both username and password.');
    }
    
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>

    
  );
};

export default Login;
