import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { UserFacade, FriendFacade } from './Facades.js';
import './Profile.css';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [friendUsernames, setUsernames] = useState(null);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState(null);
  const [editingBio, setEditingBio] = useState(false)
  const [newBio, setNewBio] = useState('')
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

    const fetchFriends = async () => {
      try {
        // Use stored username to fetch user data
        const friend_response = await FriendFacade.fetchFriendsByUserid(storedUsername);
        console.log('friend_response: ', friend_response);
        setFriends(friend_response);
        // Once friends are fetched, call the function to fetch usernames
        const usernames = await fetchUsernamesForFriends(friend_response);
        setUsernames(usernames);
      } catch (error) {
        setError(error.message);
      }
    };
    
    const fetchUsernamesForFriends = async (friendList) => {
      try {
        const usernames = [];
        for (const friend of friendList) {
          // Fetch username for each friend ID
          const user = await UserFacade.fetchUserByUserid(friend.user_two);
          usernames.push(user.username);
        }
        console.log('Usernames for friends:', usernames);
        return usernames;
      } catch (error) {
        setError(error.message);
        return []; // Return an empty array in case of error
      }
    };
    
    fetchFriends(); 
  }, []);
 
  const handleEditBio = () => {
    setEditingBio(!editingBio)
    setNewBio(user.bio)
  }

  const handleSaveBio = () => {
    setUser({...user, bio: newBio})
    UserFacade.updateUser({ ...user, bio: newBio })
    setEditingBio(false)
  }

  const handleChangeBio = (event) => {
    setNewBio(event.target.value)
  }

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
            {editingBio ? (
              // Textbox for editing bio
              <div className="bio-box">
                <h3>Edit Bio</h3>
                <textarea value={newBio} onChange={handleChangeBio} />
                <button onClick={handleSaveBio}>Save Bio</button>
              </div>
            ) : (
              // Display bio as plain text
              <div className="bio-box">
                <h3>Bio</h3>
                <p>{user.bio}</p>
                <button onClick={handleEditBio}>Edit Bio</button>
              </div>
            )}
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="friends-list">
        <h2>Friends List</h2>
        {friendUsernames && friendUsernames.length > 0 && (
          <div>
            {friendUsernames.map((username, index) => (
              <div key={index}>
                {username}
              </div>
            ))}
          </div>
        )}
        {/* Add your Friends list component here */}
      </div>
    </div>
  );
};

export default Profile;

