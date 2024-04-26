import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostFacade, CommentFacade } from '../pages/Facades';

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
  const [numComments, setNumComments] = useState(post.num_comments);

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

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        // Fetch the latest comment count for the post from the server
        const updatedPost = await CommentFacade.fetchComments(post._id);
        setNumComments(updatedPost.length);
      } catch (error) {
        console.error('Error fetching comment count:', error.message);
      }
    };

    fetchCommentCount(); // Fetch comment count when the component mounts
  }, [post._id]);

  return (
    <div className="post-details">
      <h4>{post.title}</h4>
      <p className="content">{post.content}</p>
      <div className="metadata">
        <span>{likeCount} Likes</span>
        <p>{`Comments: ${numComments} Date Posted: ${formattedDate}`}</p>
        {/* Render like button and current like count */}
        <button onClick={handleLike}>Like</button>
        <Link to={`/comments/${post._id}`} className="comments-button"><button>View Comments</button></Link>
      </div>
    </div>
  );
};

export default PostDetails;
