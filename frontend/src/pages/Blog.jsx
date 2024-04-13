// BlogsPage.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import './Blog.css';

const Blogs = () => {
  return (
    <div className="post">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content"> {/* Update class name */}
        <h1>Blog</h1>
      </div>
    </div>
  );
};

export default Blogs;
