import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import './AdminPanel.css'
export default function PaidUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="container offset-lg-1">
                <div className="row nav-row">
                    <div className="col-lg-4 nav-main">
                        <div className="nav-flex">
                            <img
                                className="nav-first-img"
                                src="https://media.licdn.com/dms/image/v2/D5603AQHNxqJ-f0xuuQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726896992279?e=1732752000&v=beta&t=OKZ_z1ZLv_AIjc9CqeqXcTbHBEy6M9o2foOgHYbIMaY"
                                alt="Profile"
                            />
                            <p className="nav-bold">{name || 'WELCOME'}</p>
                        </div>

                        {/* Hamburger Icon */}
                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? '✕' : '☰'}
                        </div>
                        {/* Nav Items */}
                        <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                            <li><Link className="nav-link" to=""><i className="fas fa-envelope"></i></Link></li>
                            <li className="nav-first-li-second" onClick={deletesession}>
                                SignOut
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

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
