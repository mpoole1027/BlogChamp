import React, { useEffect, useState } from 'react';
import { UserFacade } from '../pages/Facades';

const PostDetails = ({ post }) => {
  // Parse the date string into a Date object
  const datePosted = new Date(post.date_posted);

  // Get the month, day, and year
  const month = datePosted.toLocaleString('default', { month: 'long' });
  const day = datePosted.getDate();
  const year = datePosted.getFullYear();

  // Concatenate the formatted date
  const formattedDate = `${month} ${day}, ${year}`;

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {  
    const fetchUser = async () => {
      try {
        // Use stored username to fetch user data
        const response = await fetch(`http://localhost:4000/api/users/id/${post.user_id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  console.log(user);

  return (
    <div className="post-details">
      <h4>{post.title}</h4>
      {/* Render user.username only when user is not null */}
      {user && <h3>{user.username}</h3>}
      <p className="content">{post.content}</p>
      <div className="metadata">
        {/* Use the formatted date */}
        <p>{`Likes: ${post.like_count} Comments: ${post.num_comments} Date Posted: ${formattedDate}`}</p>
      </div>
    </div>
  );
};
export default PostDetails;

