import { useEffect, useState } from 'react'

// component for post details
import PostDetails from '../components/PostDetails'

const Home = () => {
  const [posts, setPosts] = useState(null)
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts')
      const json = await response.json()

      if (response.ok) {
        setPosts(json)
      }
    }

    fetchPosts()
  })

  return (
    <div className="home">
      <div className="workouts">
        {posts && posts.map((post) => (
          <PostDetails key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
