// ProfilePage.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import './Profile.css';

const Profile = () => {
  // You can replace these with actual username and bio data from your backend or state
  const username = "JohnDoe";
  const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <div className="profile">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content"> {/* Update class name */}
        <h1>Profile</h1>
        <div>
          <h2>Username: {username}</h2>
          <p>Bio: {bio}</p>
        </div>
      </div>
      <div className="friends-list"> {/* New section for Friends list */}
        <h2>Friends List</h2>
        {/* Add your Friends list component here */}
      </div>
    </div>
  );
};

export default Profile;

