const PostDetails = ({ post }) => {
  return (
    <div className="post-details">
      <h4>{post.title}</h4>
      <p className="content">{post.content}</p>
      <div className="metadata">
        <p>{`Likes: ${post.like_count} Comments: ${post.num_comments} Date Posted: ${post.date_posted}`}</p>
      </div>
    </div>
  );
};


export default PostDetails
