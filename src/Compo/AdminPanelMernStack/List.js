import React from 'react';
import './AllUser.css';

const UserProfile = ({ username, email, image }) => {
    return (
        
        <div className="profile-card">
            <img src={image} alt={username} className="profile-image" />
            <h2 className="username">{username}</h2>
            <p className="email">{email}</p>
            <button className="edit-button">Edit Profile</button>
        </div>
    );
};

export default UserProfile;
