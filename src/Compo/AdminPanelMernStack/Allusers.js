import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import showToast from '../usetoast/usetoast';
import UserProfile from './List'; // Adjust the path if necessary
import './AllUser.css';
import useApi from '../FetchHook/FetchPost';

const UserProfiles = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const { loading, error, data, get } = useApi('http://localhost:3001');
    const navlogin = async (event) => {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await get('/AllUser', {   }, headers);
        console.log(result)
        setUsers(result)
      
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <div className="container">
            <button className='paid-btn-one' onClick={navlogin}>All Users</button>
            {loading && <p>Loading users...</p>} {/* Loading state */}
            {error && <p className="error-message">{error.message || 'An error occurred'}</p>} {/* Error state */}
            <div className="row">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div className="col-lg-3 col-md-6 mb-4" key={index}>
                            <UserProfile
                                username={user.username}
                                email={user.email}
                                image={`http://localhost:3001/${user.image}`} 
                            />
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfiles;
