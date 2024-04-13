import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/post" element={<Post />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
