import { useState, useEffect } from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';
import './AdminPanelMernStack.css';
import useApi from '../FetchHook/FetchPost';
import { useNavigate } from "react-router-dom";
export default function AdminPanelMernStack() {
    const [adduseremail, setadduseremail] = useState('');
    const [status, updatestatus] = useState('');
    const [username, setusername] = useState('');
    const [adduserpassword, setadduserpassword] = useState('');
    const [removeinput, setremoveinput] = useState();
    const [Updateuser, setupdateuser] = useState('');
    const [RemoveErrorMessage, SetRemoveErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // New state for image
    const navigation = useNavigate();
    const [oldemail, setoldemail] = useState();
    const [oldpassword, setoldpassword] = useState();
    const [newemail, setnewemail] = useState();
    const [newpassword, setnewpassword] = useState();
    const handleRoleSelect = (selectedRole) => setRole(selectedRole);
    const updateadduseremail = (event) => setadduseremail(event.target.value);
    const updateuserpassword = (event) => setadduserpassword(event.target.value);
    const updateremoveinput = (event) => setremoveinput(event.target.value);
    const { loading, error, data, post, del, put } = useApi('http://localhost:3001');

    const AddUser = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const formData = new FormData();
        formData.append('adduseremail', adduseremail);
        formData.append('adduserpassword', adduserpassword);
        formData.append('username', username);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const result = await post('/NewUser', formData, headers);
            if (result.message === 'You are logged out. No token provided.' || result.error === 'You are logged out. Invalid token.') {
                navigation('/userlogin');
            }
            if (result.message === 'User-Save-Successfully') {
                updatestatus(result.message);
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const removeuser = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };
        try {
            const result = await del('/NewUser', JSON.stringify({ removeinput }), headers);
            if (result.message === 'You are logged out. No token provided.' || result.error === 'You are logged out. Invalid token.') {
                navigation('/userlogin');
            }
            SetRemoveErrorMessage(result.message);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    const UpdateUser = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        try {
            const result = await put('/NewUser', { oldemail, newemail, oldpassword, newpassword, role }, headers);
            if (result.message === 'You are logged out. No token provided.' || result.error === 'You are logged out. Invalid token.') {
                navigation('/userlogin');
            }
            setupdateuser('User Update');
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    };

    return (
        <>
            <AdminPanel />
            <div className='container'>
                <div className='row Main-Admin'>
                    <h1>
                        {loading && (
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <p>Loading...</p>
                            </div>
                        )}
                        {error && <div className="error">Error: {error.message}</div>}
                    </h1>
                    <div className='col-lg-6'>
                        <form className='Mern-form'>
                            <div><h1 className='Admincolor'>NEW USER</h1></div>
                            {status}
                            <div><label>Email</label></div>
                            <div><input value={adduseremail} onChange={updateadduseremail} type='email' placeholder='Enter User Email' /></div>
                            <div><label>Password</label></div>
                            <div><input value={adduserpassword} onChange={updateuserpassword} type='password' placeholder='Enter User Password' /></div>
                            <div><label>User Name</label></div>
                            <div><input placeholder='Enter User Name' value={username} onChange={(event) => { setusername(event.target.value) }} /></div>
                            <div><label>Upload Image</label></div>
                            <div>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(event) => setSelectedImage(event.target.files[0])} 
                                />
                            </div>
                            <button type="button" onClick={AddUser} className='paid-btn-one paid-btn-tops'>Submit</button>
                        </form>
                    </div>
                    <div className='col-lg-6'>
                        <form className='Mern-form'>
                            <p>{RemoveErrorMessage}</p>
                            <div><h1>REMOVE USER</h1></div>
                            <div><label>Email</label></div>
                            <div><input type='email' value={removeinput} onChange={updateremoveinput} placeholder='Enter User Email' /></div>
                            <button type="button" onClick={removeuser} className='paid-btn-one mern-btn-top-m'>Remove</button>
                        </form>
                    </div>
                    <div className='col-lg-12'>
                        <form className='Mern-form Mern-Form-two'>
                            <h1>{Updateuser}</h1>
                            <div><h1 className='Admincolor'>Update USER</h1></div>
                            <div><label>User Old Email</label></div>
                            <div><input value={oldemail} onChange={(event) => { setoldemail(event.target.value) }} type="email" placeholder='Enter User Old Email' /></div>
                            <div><label>User New Email</label></div>
                            <div><input value={newemail} onChange={(event) => { setnewemail(event.target.value) }} type="email" placeholder='Enter User New Email' /></div>
                            <div><label>User Old Password</label></div>
                            <div><input value={oldpassword} onChange={(event) => { setoldpassword(event.target.value) }} type="password" placeholder='Enter User Old Password' /></div>
                            <div><label>User New Password</label></div>
                            <div><input value={newpassword} onChange={(event) => { setnewpassword(event.target.value) }} type="password" placeholder='Enter User New Password' /></div>
                            <div>
                                <label>Role:</label>
                                <select value={role} onChange={(event) => handleRoleSelect(event.target.value)}>
                                    <option value="">Select a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button type="button" onClick={UpdateUser} className='paid-btn-one mern-btn-top-m'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
