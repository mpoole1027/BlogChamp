import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { UserFacade, FriendFacade } from './Facades.js';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const { username } = useParams(); // Get username from URL parameter

  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    
    const fetchUser = async () => {
      try {
        // Use stored username to fetch user data
        const response = await UserFacade.fetchUserByUserid(storedUsername);
        console.log(response);
        setUser(response);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  const addFriend = async () => {
    try {
      // Fetch user_two's ID using fetchUserByUsername
      const userTwo = await UserFacade.fetchUserByUsername(newFriendUsername);
      console.log("User one id: ", user._id)
      console.log("User two id: ", userTwo._id)
      // Call FriendFacade method to add friend
      await FriendFacade.addFriend(user._id, userTwo._id);
      // Reset the input field after adding friend
      setNewFriendUsername('');
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleAddFriend = (e) => {
    e.preventDefault();
    addFriend();
  };

  return (
    <div className="profile">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1 className="profile-title">Profile</h1>
        {user && (
          <div className="profile-info">
            <h2>Username: {user.username}</h2>
            <div className="bio-box">
              <h3>Bio</h3>
              <p>{user.bio}</p>
            </div>
          </div>
        )}
        {error && <p>Error: {error}</p>}
        <div className="add-friend">
          <h2>Add Friend</h2>
          <form onSubmit={handleAddFriend}>
            <input
              type="text"
              placeholder="Enter username"
              value={newFriendUsername}
              onChange={(e) => setNewFriendUsername(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
      <div className="friends-list">
        <h2>Friends List</h2>
        {/* Add your Friends list component here */}
      </div>
    </div>
  );
};

export default Profile;
