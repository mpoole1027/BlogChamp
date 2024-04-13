import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* Navigation Links */}
          <nav>
            <ul>
              <li><Link to="/">Log In</Link></li>
              <li><Link to="/post">Post</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
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
