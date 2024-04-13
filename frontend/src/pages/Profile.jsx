// ProfilePage.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import './Profile.css';

const Profile = () => {
  return (
    <div className="post">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content"> {/* Update class name */}
        <h1>Profile</h1>
      </div>
    </div>
  );
};

export default Profile;
