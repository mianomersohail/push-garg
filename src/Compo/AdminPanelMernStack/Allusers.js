import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import showToasts from '../usetoast/usetoast';
import UserProfile from './List'; // Adjust the path if necessary
import './AllUser.css';
import useApi from '../FetchHook/FetchPost';

const UserProfiles = () => {
    const [users, setUsers] = useState([]);
    const  showToast  = showToasts(); 

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
        showToast('error', 'Unexpected error occurred.');
        console.error(err);
      }
    };

    return (
        <div className="container">
            <button className='morph-btn' onClick={navlogin}>All Users</button>
            {loading && (
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <p>Loading...</p>
                            </div>
                        )}
            {error && <p className="error-message">{error.message || 'An error occurred'}</p>} {/* Error state */}
            <div className="row">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div className="col-lg-3 col-md-6 mb-4" key={index}>
                            <UserProfile
                                username={user.username}
                                email={user.email}
                                id={user._id}
                                Phone={user.phone}
                                role={user.role}
                                image={`http://localhost:3001/${user.image}`} 
                            />
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default UserProfiles;
