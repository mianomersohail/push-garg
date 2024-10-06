import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './AdminPanel.css';
import Navbar from '../Nav/NavList';
export default function PaidUser() {
    const [switchValue, setSwitchValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state?.Data || {}; 
       
    const signout = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            navigate('/userlogin');
        }, 200); 
    };
    
    const changeSwitchValue = (value) => {
        setSwitchValue(value);
        setIsDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const switchTo = () => {
        if (switchValue === 'Add/Remove') {
            navigate('/AdminPanelMernStack');
        } else if (switchValue === 'TRADING/SIGNALS') {
            navigate('/TradingSignalAdmin');
        } else if (switchValue === 'BLOCKCHAIN') {

        }

    };
    

    return (
        <>
            <Navbar name={name || 'Umer'} navlinameone={'Chat'} linkone={'Deletesession'} navlinametwo={'SignOut'} onClick={signout} />
            <div className='container offset-lg-1'>
                <div className='row Paid-User-Main'>
                    <div className='col-lg-6 Paid-welcome'>
                        <h1 style={{ color: '#4077B6' }}>Welcome {name || 'John'}</h1>
                        <p style={{ color: '#958984' }}>
                            Hi Admin, hope your day was good. Please select the section you want to update for users.
                        </p>
                        <div className='col-lg-6 floating-label'>
                            <div className="custom-dropdown">
                                <input
                                    type="text"
                                    value={switchValue}
                                    readOnly
                                    onClick={toggleDropdown}
                                    placeholder='Choose your section'
                                    className="dropdown-input"
                                />
                                {isDropdownOpen && (
                                    <ul className="dropdown-options">
                                        <li onClick={() => changeSwitchValue('Add/Remove')}>New User</li>
                                        <li onClick={() => changeSwitchValue('BLOCKCHAIN')}>BlockChain</li>
                                        <li onClick={() => changeSwitchValue('TRADING/SIGNALS')}>Trading Signals</li>
                                        <li onClick={() => changeSwitchValue('Update User/Admin/Password')}></li>
                                        <li onClick={() => changeSwitchValue('Add/Remove Admin')}></li>
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
