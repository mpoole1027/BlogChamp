// Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

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
      })

      if (response.status == 200) {
        navigate("/post")
      } else {
        navigate("/")
      }
    }

    autoLogin()
  }, [])

  const handleLogin = async () => {
    const fetchUserByUsername = (username) => {
      return fetch(`http://localhost:4000/api/users/username/${username}`)
    }
    // Check if username and password are valid
    if (username && password) {
      try {
        var response = await fetchUserByUsername(username)
        const user = await response.json()

        if (response.ok) {
          if (user) {
            console.log('User found: ', user.username)
            console.log('Login successful!')
            response = await fetch("http://localhost:4000/login", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                id: user.username,
                password: user.password,
              })
            })
            if (response.status == 200){
              localStorage.setItem('username', username);
              navigate('/Post');
            }
          } else {
            setErrorMessage('User not found. Please enter a valid username.')
          }
        } else {
          setErrorMessage('User not found, please try again')
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
        var response = await addUser(newUsername, newPassword)
        if (response.ok) {
            console.log('User created: ', username)
            console.log('Signup successful!')
            response = await fetch("http://localhost:4000/login", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                id: newUsername,
                password: newPassword,
              })
            })
            if (response.status == 200){
              navigate(`/Post`);
            }
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
