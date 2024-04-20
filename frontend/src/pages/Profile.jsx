import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { UserFacade } from './Facades.js';
import './Profile.css';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useParams(); // Get username from URL parameter

  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    
    const fetchUser = async () => {
      try {
        // Use stored username to fetch user data
        const response = await UserFacade.fetchUserByUserid(storedUsername);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1 className="profile-title">Profile</h1>
        {user && (
          <div className="profile-info">
            <h2>Username: {user.username}</h2>
            <div className="bio-box">
              <h3>Bio</h3>
              <p>{user.bio}</p>
            </div>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="friends-list">
        <h2>Friends List</h2>
        {/* Add your Friends list component here */}
      </div>
    </div>
  );
};

export default Profile;

