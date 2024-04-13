import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/posts" className="sidebar-button">Posts</Link>
      <Link to="/blogs" className="sidebar-button">Blogs</Link>
      <Link to="/profile" className="sidebar-button">Profile</Link>
      <Link to="/friends" className="sidebar-button">Friends</Link>
      <Link to="/settings" className="sidebar-button">Settings</Link>
      <Link to="/create-post" className="sidebar-button">Create Post</Link>
      <Link to="/logout" className="sidebar-button">Logout</Link>
    </div>
  );
};

export default Sidebar;
