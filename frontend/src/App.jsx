import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import IndividualBlog from './pages/IndividualBlog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/comments/:post_id" element={<Comments />}/>
          <Route path="/user/:username" element={<IndividualBlog />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
