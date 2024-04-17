// ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const username = "Izaac"; // Hardcoded username

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/username/${username}`);
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
        <h1>Profile</h1>
        {user && (
          <div>
            <h2>Username: {user.username}</h2>
            <p>Bio: {user.bio}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
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
