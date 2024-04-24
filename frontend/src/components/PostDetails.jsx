import React, { useEffect, useState } from 'react';
import { PostFacade } from '../pages/Facades';

const PostDetails = ({ post }) => {
  // Parse the date string into a Date object
  const datePosted = new Date(post.date_posted);

  // Get the month, day, and year
  const month = datePosted.toLocaleString('default', { month: 'long' });
  const day = datePosted.getDate();
  const year = datePosted.getFullYear();

  // Concatenate the formatted date
  const formattedDate = `${month} ${day}, ${year}`;

  // State for keeping track of like count
  const [likeCount, setLikeCount] = useState(post.like_count);

  // Function to handle like button click
  const handleLike = async () => {
    try {
      // Update like count on the server
      await PostFacade.updatePostLikeCount(post._id, likeCount + 1);
      // Update like count locally
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.error('Error updating like count:', error.message);
    }
  };

  return (
    <div className="post-details">
      <h4>{post.title}</h4>
      <p className="content">{post.content}</p>
      <div className="metadata">
        {/* Render like button and current like count */}
        <button onClick={handleLike}>Like</button>
        <span>{likeCount} Likes</span>
        <p>{`Comments: ${post.num_comments} Date Posted: ${formattedDate}`}</p>
      </div>
    </div>
  );
};

export default PostDetails;
