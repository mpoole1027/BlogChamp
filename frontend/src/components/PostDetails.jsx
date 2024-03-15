const PostDetails = ({ post }) => {
  return (
    <div className="post-details">
      <h4>{post._id}</h4>
      <p>Number of likes: {post.like_count}</p>
      <p>Number of comments: {post.num_comments}</p>
      <p>Day posted: {post.date_posted}</p>
    </div>
  )
}

export default PostDetails
