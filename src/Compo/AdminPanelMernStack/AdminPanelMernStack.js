import { useState } from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';
import './AdminPanelMernStack.css';
import { useNavigate } from "react-router-dom";

export default function AdminPanelMernStack() {
    const [addusererror, setaddusererror] = useState('');
    const [adduservalue, setadduservalue] = useState('');
    const [adduseremail, setadduseremail] = useState('');
    const [adduserpassword, setadduserpassword] = useState('');
    const [addusername, setaddusername] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [removeinput, setremoveinput] = useState('');
    const [RemoveErrorMessage, SetRemoveErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRoleSelect = (selectedRole) => setRole(selectedRole);

    const updateaddusername = (event) => setaddusername(event.target.value);
    const updateadduseremail = (event) => setadduseremail(event.target.value);
    const updateuserpassword = (event) => setadduserpassword(event.target.value);
    const updateremoveinput = (event) => setremoveinput(event.target.value);

    const localvalue = localStorage.getItem('token');

    const handleSelection = (value) => {
        setadduservalue(value);
        setShowSuggestions(false);
    };

    const RemoveUser = async (event) => {
        event.preventDefault();
        try {
            const sessionData = localStorage.getItem('token');

            const Response = await fetch('http://localhost:3001/RemoveUser', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData}`,
                },
                body: JSON.stringify({ email: removeinput })
            });

            if (!Response) {
                SetRemoveErrorMessage('Server Not Responding');
                return;
            }

            const Result = await Response.json();
            if (Result.errormessage === "Not-Token") {
                return navigate('/userlogin');
            } else {
                SetRemoveErrorMessage(Result.message || Result.errormessage);
            }
        } catch (error) {
            SetRemoveErrorMessage(error.message);
        }
    };

    const addnewuser = async (event) => {
        event.preventDefault();
        try {
            const NewUserData = {
                adduseremail,
                addusername,
                adduserpassword,
                adduservalue
            };

            const Response = await fetch('http://localhost:3001/NewUser', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localvalue}`,
                },
                body: JSON.stringify(NewUserData)
            });

            if (!Response) {
                setaddusererror("No Response from Server");
                return;
            }

            const DataFromServer = await Response.json();
            if (DataFromServer.errormessage == "Not-Token") {
                return navigate('/userlogin');
            } else {
                setaddusererror(DataFromServer.message || "User Not Added. Try Again.");
            }
        } catch (error) {
            setaddusererror(error.message);
        }
    };

    const updateUser = async (event) => {
        event.preventDefault();
        try {
            const UpdateUserData = {
                oldEmail: removeinput,
                newEmail: adduseremail,
                oldPassword: adduserpassword,
                newPassword: adduserpassword,
                role
            };

            const Response = await fetch('http://localhost:3001/UpdateUser', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localvalue}`,
                },
                body: JSON.stringify(UpdateUserData)
            });

            if (!Response.ok) {
                setaddusererror("No Response from Server");
                return;
            }

            const DataFromServer = await Response.json();
            if (DataFromServer.errormessage === "Not-Token") {
                return navigate('/userlogin');
            } else {
                setaddusererror(DataFromServer.message || "User Not Updated. Try Again.");
            }
        } catch (error) {
            setaddusererror(error.message);
        }
    };

    return (
        <>
            <AdminPanel />
            <div className='container'>
                <div className='row Main-Admin'>
                    <div className='col-lg-4'>
                        <form className='Mern-form'>
                            <div><h4>{addusererror}</h4></div>
                            <div><h1 className='Admincolor'>ADD USER</h1></div>

                            <div>
                                <label>User Interest</label>
                                <div
                                    className="dropdown"
                                    onMouseEnter={() => setShowSuggestions(true)}
                                    onMouseLeave={() => setShowSuggestions(false)}
                                >
                                    <button type="button" className="dropdown-button">
                                        {adduservalue || 'Choose Section'}
                                    </button>
                                    <div className={`dropdown-content ${showSuggestions ? 'open' : ''}`}>
                                        <div onClick={() => handleSelection('MERN STACK')}>MERN STACK</div>
                                        <div onClick={() => handleSelection('BLOCKCHAIN')}>BLOCKCHAIN</div>
                                        <div onClick={() => handleSelection('TRADING/SIGNALS')}>TRADING/SIGNALS</div>
                                    </div>
                                </div>
                            </div>

                            <div><label>User Name</label></div>
                            <div><input value={addusername} onChange={updateaddusername} type='text' placeholder='Enter User Name' /></div>

                            <div><label>Email</label></div>
                            <div><input value={adduseremail} onChange={updateadduseremail} type='email' placeholder='Enter User Email' /></div>

                            <div><label>Password</label></div>
                            <div><input value={adduserpassword} onChange={updateuserpassword} type='password' placeholder='Enter User Password' /></div>
                            <button type="button" onClick={addnewuser} className='paid-btn-one'>Add</button>
                        </form>
                    </div>
                    <div className='col-lg-4'>
                        <form className='Mern-form'>
                            <p>{RemoveErrorMessage}</p>
                            <div><h1>REMOVE USER</h1></div>
                            <div><label>Email</label></div>
                            <div><input type='email' value={removeinput} onChange={updateremoveinput} placeholder='Enter User Email' /></div>
                            <button type="button" onClick={RemoveUser} className='paid-btn-one'>Remove</button>
                        </form>
                    </div>
                    <div className='col-lg-4'>
                        <form className='Mern-form'>
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

                            <button type="button" onClick={updateUser} className='paid-btn-one'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
