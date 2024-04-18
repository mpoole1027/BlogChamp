import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  const navigate = useNavigate()
  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        navigate("/");
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="sidebar">
      <Link to="/post" className="sidebar-button">Posts</Link>
      <Link to="/blog" className="sidebar-button">Blogs</Link>
      <Link to="/profile" className="sidebar-button">Profile</Link>
      <Link to="/" onClick={signOut} className="sidebar-button">Logout</Link>
    </div>
  );
};

export default Sidebar;
