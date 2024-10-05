import { useState,useEffect } from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';
import './AdminPanelMernStack.css';
import useApi from '../FetchHook/FetchPost';
import { useNavigate } from "react-router-dom";
export default function AdminPanelMernStack() {
    const [adduseremail, setadduseremail] = useState('');
    const [status,updatestatus]=useState('')
    const [adduserpassword, setadduserpassword] = useState('');
    const [removeinput, setremoveinput] = useState('');
    const [RemoveErrorMessage, SetRemoveErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const navigation = useNavigate();
    const handleRoleSelect = (selectedRole) => setRole(selectedRole);
    const updateadduseremail = (event) => setadduseremail(event.target.value);
    const updateuserpassword = (event) => setadduserpassword(event.target.value);
    const updateremoveinput = (event) => setremoveinput(event.target.value);
    const { loading, error, data, post } = useApi('http://localhost:3001'); 
  const AddUser = async () =>{
    const token=localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
    try {
      const result = await post('/NewUser',{adduseremail,adduserpassword}, headers);
      if(result.message=='User-Save-Successfully'){
        updatestatus(result.message)
      }
    } catch (err) {
      console.error(err);
    }
  };
    return (
        <>
            <AdminPanel />
            <div className='container'>
                <div className='row Main-Admin'>
                    <div className='col-lg-6'>
                        <form className='Mern-form'>
                        {loading && <div className="loading">Loading...</div>}
                        {error && <div className="error">Error: {error.message}</div>}
                            <div><h1 className='Admincolor'>NEW USER</h1></div>
                            {status}
                            <div><label>Email</label></div>
                            <div><input value={adduseremail} onChange={updateadduseremail} type='email' placeholder='Enter User Email' /></div>
                            <div><label>Password</label></div>
                            <div><input value={adduserpassword} onChange={updateuserpassword} type='password' placeholder='Enter User Password' /></div>
                            <button type="button" onClick={AddUser} className='paid-btn-one paid-btn-tops'>Submit</button>
                        </form>
                    </div>
                    <div className='col-lg-6'>
                        <form className='Mern-form'>
                            <p>{RemoveErrorMessage}</p>
                            <div><h1>REMOVE USER</h1></div>
                            <div><label>Email</label></div>
                            <div><input type='email' value={removeinput} onChange={updateremoveinput} placeholder='Enter User Email' /></div>
                            <button type="button" onClick={'removeuser'} className='paid-btn-one mern-btn-top-m'>Remove</button>
                        </form>
                    </div>
                    <div className='col-lg-12'>
                        <form className='Mern-form Mern-Form-two'>
                            <div><h1 className='Admincolor'>Update USER</h1></div>
                            <div><label>User Old Email</label></div>
                            <div><input type="email" placeholder='Enter User Old Email' /></div>
                            <div><label>User New Email</label></div>
                            <div><input type="email" placeholder='Enter User New Email' /></div>
                            <div><label>User Old Password</label></div>
                            <div><input type="password" placeholder='Enter User Old Password' /></div>
                            <div><label>User NEW Password</label></div>
                            <div><input placeholder='NEW PASSWORD' /></div>
                            <div><label>User Role</label></div>
                            <div className='role-dropdown-container'>
                                <input
                                    className="role-input"
                                    placeholder='Enter User Role'
                                    value={role}
                                    readOnly
                                />
                                <ul className='role-dropdown'>
                                    <li onClick={() => handleRoleSelect('Admin')}>Admin</li>
                                    <li onClick={() => handleRoleSelect('User')}>User</li>
                                </ul>
                            </div>
                            <button type="button" onClick={'updateuser'} className='paid-btn-one paid-btn-tops'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
