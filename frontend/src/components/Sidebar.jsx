import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-button">Posts</button>
      <button className="sidebar-button">Blogs</button>
      <button className="sidebar-button">Profile</button>
      <button className="sidebar-button">Friends</button>
      <button className="sidebar-button">Settings</button>
      <button className="sidebar-button">Create Post</button>
      <button className="sidebar-button">Logout</button>
    </div>
  );
};

export default Sidebar;
