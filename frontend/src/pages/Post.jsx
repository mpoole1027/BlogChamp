// Post.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import PostDetails from '../components/PostDetails';
import './Post.css'; // Import the CSS file

const Post = () => {
  // Dummy data for blog posts (replace this with actual data)
  const posts = [
    {
      _id: 1,
      title: "Journey Through Nature's Symphony",
      content:
        "Embark on a journey through lush forests and serene meadows. Witness sunlight filtering through leaves, listen to birdsong, and feel the breeze against your skin.",
      like_count: 10,
      num_comments: 5,
      date_posted: '2024-03-29',
    },
    {
      _id: 2,
      title: 'Embracing Mindfulness in Daily Life',
      content:
        'In the hustle and bustle of modern life, practice mindfulness for peace and presence. Savor coffee aromas, feel earth underfoot during leisurely strolls, and embrace moments with intention.',
      like_count: 15,
      num_comments: 7,
      date_posted: '2024-03-28',
    },
    {
      _id: 3,
      title: 'Unleashing Creativity Through Writing',
      content:
        "Dive into imagination's realms with words. Paint vibrant landscapes of thought and emotion. Each pen stroke uncovers hidden treasures within the soul.",
      like_count: 20,
      num_comments: 3,
      date_posted: '2024-03-27',
    },
  ];

  return (
    <div className="post">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content"> {/* Update class name */}
        <h1>Posts</h1>
        {posts.map((post) => (
          <PostDetails key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Post;
