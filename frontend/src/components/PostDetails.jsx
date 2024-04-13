const PostDetails = ({ post }) => {
  // Parse the date string into a Date object
  const datePosted = new Date(post.date_posted);

  // Get the month, day, and year
  const month = datePosted.toLocaleString('default', { month: 'long' });
  const day = datePosted.getDate();
  const year = datePosted.getFullYear();

  // Concatenate the formatted date
  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div className="post-details">
      <h4>{post.title}</h4>
      <p className="content">{post.content}</p>
      <div className="metadata">
        {/* Use the formatted date */}
        <p>{`Likes: ${post.like_count} Comments: ${post.num_comments} Date Posted: ${formattedDate}`}</p>
      </div>
    </div>
  );
};



export default PostDetails
