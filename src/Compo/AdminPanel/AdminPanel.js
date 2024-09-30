import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import './AdminPanel.css'
import Navbar from '../Nav/NavList'
export default function PaidUser() {
    const [mainMernPage, setMainMernPage] = useState(true);
    const [isMern, setIsMern] = useState(false);
    const [switchValue, setSwitchValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown toggle
    const [Trading,SetTrading]=useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state?.Data || {};
    
    const deletesession = () => {
        localStorage.removeItem('token');
        navigate('/userlogin');
    };
    

    const changeSwitchValue = (value) => {
        setSwitchValue(value);
        setIsDropdownOpen(false); // Close the dropdown when a value is selected
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open/close
    };

    const switchTo = () => {
        if (switchValue === 'Add/Remove') {
            setMainMernPage(false);
            setIsMern(true);
        }
        if(switchValue==='TRADING/SIGNALS'){
            setMainMernPage(false)
        SetTrading(true)
        }
    };

    React.useEffect(() => {
        if (!mainMernPage && isMern) {
            navigate('/AdminPanelMernStack');
        }
        if(!mainMernPage && Trading){
            navigate('/TradingSignalAdmin')
        }
    }, [mainMernPage, isMern, navigate,Trading]);



    return (
        <>
        <Navbar name={name} navlinameone={'SignOut'} linkone={'Deletesession'}/>            
            <div className='container offset-lg-1'>
                <div className='row Paid-User-Main'>
                    <div className='col-lg-6 Paid-welcome'>
                        <h1 style={{color:'#4077B6'}}>Welcome {name || 'John'}</h1>
                        <p style={{color:'#958984'}}>
                            Hi Admin, hope your day was good. Please select the section you want to update for users.
                        </p>
                        <div className='col-lg-6 floating-label'>
                            {/* Custom Input Dropdown */}
                            <div className="custom-dropdown">
                                <input
                                    type="text"
                                    value={switchValue}
                                    readOnly
                                    onClick={toggleDropdown} // Toggle dropdown on click
                                    placeholder='Choose your section'
                                    className="dropdown-input"
                                />
                                {isDropdownOpen && (
                                    <ul className="dropdown-options">
                                        <li onClick={() => changeSwitchValue('Add/Remove')}>Add/Remove</li>
                                        <li onClick={() => changeSwitchValue('BLOCKCHAIN')}>BLOCKCHAIN</li>
                                        <li onClick={() => changeSwitchValue('TRADING/SIGNALS')}>TRADING/SIGNALS</li>
                                        <li onClick={() => changeSwitchValue('Add/Remove User')}>Add/Remove User</li>
                                        <li onClick={() => changeSwitchValue('Update User/Admin/Password')}>Update User/Admin/Password</li>
                                        <li onClick={() => changeSwitchValue('Add/Remove Admin')}>Add/Remove Admin</li>
                                    </ul>
                                )}
                            </div>
                            <button onClick={switchTo} className='paid-btn-one'>Switch</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
