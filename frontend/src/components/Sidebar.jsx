import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/post" className="sidebar-button">Posts</Link>
      <Link to="/blog" className="sidebar-button">Blogs</Link>
      <Link to="/profile" className="sidebar-button">Profile</Link>
      <Link to="/" className="sidebar-button">Logout</Link>
    </div>
  );
};

export default Sidebar;
