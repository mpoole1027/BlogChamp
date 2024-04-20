import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  // Retrieve username from local storage
  const storedUsername = localStorage.getItem('username');

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const openDialog = () => {
      setIsDialogOpen(true);
    };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Clear post title and content when closing the dialog
    setPostTitle('');
    setPostContent('');
  };

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle post submission here, e.g., send data to server
    console.log("Post title:", postTitle);
    console.log("Post content:", postContent);
    // After handling submission, close the dialog
    closeDialog();
  };

  return (
    <div className="sidebar">
      <Link to="/post" className="sidebar-button">Posts</Link>
      <Link to="/blog" className="sidebar-button">Blogs</Link>
      {/* Pass the username as a parameter to the profile page */}
      <Link to={`/profile/${storedUsername}`} className="sidebar-button">Profile</Link>
      <Link to="/" onClick={signOut} className="sidebar-button">Logout</Link>
      <Link className="sidebar-button" onClick={openDialog}>Create Post</Link>
      {/* Create Post Box */}
      {isDialogOpen && (
        <div className="dialog">
          <div className="sidebar-button">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>

            <input
                type="text"
                value={postTitle}
                onChange={handlePostTitleChange}
                placeholder="Enter post title..."
                required
              />
              <input
                type = "text"
                value={postContent}
                onChange={handlePostContentChange}
                placeholder="Enter your post content here..."
                required
              />

              <div style={{ marginBottom: '10px' }}>
                <div className='submit-button'>
                  <button type="submit">Submit</button>
                </div>

                <button type="button" onClick={closeDialog}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
