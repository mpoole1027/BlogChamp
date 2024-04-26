import React, { useState, useEffect } from 'react';
import './Comments.css';
import Sidebar from '../components/Sidebar';
import { CommentFacade } from '../pages/Facades.js';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { post_id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState(null);

  const fetchComments = async () => {
    try {
      // Fetch comments for the specific post ID
      const response = await CommentFacade.fetchComments(post_id);
      // Sort comments by the newest ones at the top
      const sortedComments = response.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
      setComments(sortedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments when the component mounts
  }, [post_id]); // Add post_id to the dependency array

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCommentContent('');
  };

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
  
    const commentData = {
      date_posted: new Date().toISOString(), // Get current date and time
      post_id: post_id,
      content: commentContent
    };
  
    try {
      // Create comment using CommentFacade
      await CommentFacade.createComment(post_id, commentData);
  
      // After handling submission, close the dialog and fetch comments again
      closeDialog();
      fetchComments(); // Update comments after submitting
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  

  return (
    <div className="comments-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="create-comment">
          <button className="create-comment-button" onClick={openDialog}>Create Comment</button>
          {isDialogOpen && (
            <div className="dialog">
              <div className="create-comment-form">
                <h3>Create Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    value={commentContent}
                    onChange={handleCommentContentChange}
                    placeholder="Enter your comment..."
                    required
                  />
                  <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={closeDialog}>Close</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        {/* Display comments */}
        <div className="comments-list">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment.content}</p>
                <p>Date Posted: {new Date(comment.date_posted).toLocaleString()}</p> {/* Display date posted */}
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
