// Post.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import PostDetails from '../components/PostDetails';
import './Post.css'; // Import the CSS file
import { useEffect, useState } from 'react'

const Post = () => {
  const [posts, setPosts] = useState(null)
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:4000/api/posts')
      const json = await response.json()

      if (response.ok) {
        setPosts(json)
      }
    }

    fetchPosts()

  })

  return (
    <div className="post">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content"> {/* Update class name */}
        <h1>Posts</h1>
        {/* Check if posts array is not null or empty */}
        {posts && posts.length > 0 && (
          posts.map((post) => (
            <PostDetails key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
