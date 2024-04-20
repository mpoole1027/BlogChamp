import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserFacade } from './Facades.js'; 
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function autoLogin() {
      const response = await fetch("http://localhost:4000/autoLogin", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        navigate("/post");
      } else {
        navigate("/");
      }
    }

    autoLogin();
  }, []);

  const handleLogin = async () => {
    // Check if username and password are valid
    if (username && password) {
      try {
        const user = await UserFacade.fetchUserByUsername(username);
        console.log('user:', user);
        if (user) {
          console.log('User found: ', user.username);
          console.log('Login successful!');
          const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: user.username,
              password: user.password,
            }),
          });
          if (response.status === 200) {
              console.log(user);
              localStorage.setItem('username', user._id);
              navigate('/Post');
          }
        } else {
          setErrorMessage('User not found. Please enter a valid username.');
        }
      } catch (error) {
        console.error('Error fetching user: ', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please enter both username and password.');
    }
  };

  const handleSignUp = async () => {
    if (newUsername && newPassword) {
      try {
        // Check if the user already exists
        const checkUserResponse = await UserFacade.getUserByUsername(newUsername);
        if (checkUserResponse.ok) {
          const user = await checkUserResponse.json();
          if (user) {
            setErrorMessage('Username already exists. Please choose a different one.');
            return;
          }
        } else {
          setErrorMessage('Error checking username availability. Please try again later.');
          return;
        }
  
        // Create a new user if the username is available
        const newUser = new UserFacade(newUsername, newPassword, "test123@nau.edu", 0, "Enter your bio here!");
        var response = await UserFacade.createUser(newUser);
        if (response) {
          console.log('User created: ', newUsername);
          console.log('Signup successful!');
          response = await fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: newUsername,
              password: newPassword,
            }),
          });
          if (response.status === 200) {
            navigate('/Post');
          }
        } else {
          setErrorMessage('Error creating user. Please try again later.');
        }
      } catch (error) {
        console.error('Error adding user: ', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please enter both username and password.');
    }
  };

  return (
    <div className = 'page'>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <button onClick={handleSignUp}>Sign Up</button>

        </div>
      </div>

    </div>
  );
};

export default Login;