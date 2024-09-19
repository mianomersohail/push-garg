import { useState } from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';
import './AdminPanelMernStack.css';

export default function AdminPanelMernStack() {
    const [addusererror, setaddusererror] = useState('');
    const [adduservalue, setadduservalue] = useState('');
    const [adduseremail, setadduseremail] = useState('');
    const [adduserpassword, setadduserpassword] = useState('');
    const [addusername, setaddusername] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [removeinput, setremoveinput] = useState('');
    const [RemoveErrorMessage, SetRemoveErrorMessage] = useState('')
    const [role, setRole] = useState(''); // State to hold the selected role

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole); // Set the role when an `li` is clicked
    };
    const updateaddusername = (event) => setaddusername(event.target.value);
    const updateadduseremail = (event) => setadduseremail(event.target.value);
    const updateuserpassword = (event) => setadduserpassword(event.target.value);
    const localvalue = localStorage.getItem('token');
    const updateremoveinput = (event) => {
        setremoveinput(event.target.value)
    }
    const handleSelection = (value) => {
        setadduservalue(value);
        setShowSuggestions(false); // hide suggestions after selection
    };
    const RemoveUser = async (event) => {
        event.preventDefault()
        try {
            const Response = await fetch('http://localhost:3001/RemoveUser', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ removeinput })
            })
            if (!Response.ok) {
                SetRemoveErrorMessage('Server Not Responding');
            }

            const Result = await Response.json()
            if (Result.errormessage) {
                SetRemoveErrorMessage(Result.errormessage);
            } else {
                SetRemoveErrorMessage(Result.message);
            }
        } catch (error) {
            SetRemoveErrorMessage(error.message);
        }
    }

    const addnewuser = async (event) => {
        event.preventDefault();
        try {
            const NewUserData = {
                adduseremail,
                addusername,
                adduserpassword,
                adduservalue
            };
            const Reponse = await fetch('http://localhost:3001/NewUser', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localvalue}`,
                },
                body: JSON.stringify(NewUserData)
            });
            if (!Reponse) {
                setaddusererror("No Response from Server");
            }
            const DataFromServer = await Reponse.json();
            if (DataFromServer) {
                setaddusererror('User Successfully Added');
            } else {
                setaddusererror("User Not Added. Try Again.");
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
                                    <button className="dropdown-button">
                                        {adduservalue ? adduservalue : 'Choose Section'}
                                    </button>
                                    <div className={`dropdown-content ${showSuggestions ? 'open' : ''}`}>
                                        <div onClick={() => handleSelection('MERN STACK')}>MERN STACK</div>
                                        <div onClick={() => handleSelection('BLOCKCHAIN')}>BLOCKCHAIN</div>
                                        <div onClick={() => handleSelection('TRADING/SIGNALS')}>TRADING/SIGNALS</div>
                                    </div>
                                </div>
                            </div>

                            <div><label>User Name</label></div>
                            <div><input value={addusername} onChange={updateaddusername} type='text' name="newusername" placeholder='Enter User Name' /></div>

                            <div><label>Email</label></div>
                            <div><input value={adduseremail} onChange={updateadduseremail} type='email' name="newuseremail" placeholder='Enter User Email' /></div>

                            <div><label>Password</label></div>
                            <div><input value={adduserpassword} onChange={updateuserpassword} type='password' name='newuserpassword' placeholder='Enter User Password' /></div>
                            <button onClick={addnewuser} className='paid-btn-one'>Add</button>
                        </form>
                    </div>
                    <div className='col-lg-4'>
                        <form className='Mern-form'>
                            <p>{RemoveErrorMessage}</p>
                            <div><h1 className=''>REMOVE USER</h1></div>
                            <div><label>Email</label></div>
                            <div><input type='email' value={removeinput} onChange={updateremoveinput} name="email" placeholder='Enter User Email' /></div>
                            <button onClick={RemoveUser} className='paid-btn-one'>Remove</button>
                        </form>
                    </div>
                    <div className='col-lg-4'>
                    <form className='Mern-form'>
            <div><h1 className='Admincolor'>Update USER</h1></div>

            <div><label>User Old Email</label></div>
            <div><input type="email" placeholder='Enter User Old Email' /></div>

            <div><label>User New Email</label></div>
            <div><input type="email" placeholder='Enter User Old Email' /></div>

            <div><label>User Old Password</label></div>
            <div><input type="password" placeholder='Enter User Old Password' /></div>

            <div><label>User NEW Password</label></div>
            <div><input placeholder='NEW PASSWORD' /></div>

            <div><label>User Role</label></div>
            <div className='role-dropdown-container'>
                <input 
                    className="role-input" 
                    placeholder='Enter User Role' 
                    value={role} // Display the selected role
                    readOnly // Make the input read-only, so the value can only be set by clicking on a list item
                />
                <ul className='role-dropdown'>
                    <li onClick={() => handleRoleSelect('Admin')}>Admin</li>
                    <li onClick={() => handleRoleSelect('Editor')}>User</li>
                    
                </ul>
            </div>

            <button onClick={''} className='paid-btn-one'>Update</button>
        </form>



                    </div>
                </div>
            </div>
        </>
    );
}
