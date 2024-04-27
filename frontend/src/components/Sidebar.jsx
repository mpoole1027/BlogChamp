import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import '../pages/Facades.js'
import { PostFacade, BlogFacade } from '../pages/Facades.js';

const Sidebar = () => {
  const navigate = useNavigate();

  // Retrieve username from local storage
  const storedUserId = localStorage.getItem('user_id');

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
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [addToBlog, setAddToBlog] = useState(false)

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCheckboxChange = (event) => {
    setAddToBlog(event.target.checked)
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let blog_id

    if (addToBlog) {
      const blog = await BlogFacade.fetchBlogByUserid(storedUserId)
      console.log(blog._id)
      blog_id = blog._id
    }

    else {
      blog_id = null
    }

    const postData = {
      like_count: 0, // Default value for like count
      num_comments: 0, // Default value for number of comments
      date_posted: new Date().toISOString(), // Current date and time
      // Include any other necessary data here, such as user ID or blog ID
      user_id: storedUserId, // Replace with the actual user ID
      content: postContent,
      title: postTitle,
      blog_id: blog_id, // Replace with the actual blog ID
    };

    console.log("postData:", postData);

    PostFacade.createPost(postData)
  
    // After handling submission, close the dialog
    closeDialog();
  };

  return (
    <div className="sidebar">
      <Link to="/post" className="sidebar-button">Posts</Link>
      <Link to="/blog" className="sidebar-button">Blogs</Link>
      {/* Pass the username as a parameter to the profile page */}
      <Link to={`/profile/${storedUserId}`} className="sidebar-button">Profile</Link>
      <Link to="/" onClick={signOut} className="sidebar-button">Logout</Link>
      <Link className="sidebar-button" onClick={openDialog}>Create Post</Link>
    {/* Create Post Box */}
    {isDialogOpen && (
        <div className="dialog">
          <div>
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
              <input className='blog-check'
                type="checkbox"
                checked={addToBlog}
                onChange={handleCheckboxChange}
              />
              <label >Add to Blog</label>

              <div style={{ marginBottom: '10px' }}>
                <button className="sidebar-button">Submit</button>
                <button className="sidebar-button" onClick={closeDialog}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;