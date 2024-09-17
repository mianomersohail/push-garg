import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
export default function PaidUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mainMernPage, setMainMernPage] = useState(true);
    const [isMern, setIsMern] = useState(false);
    const [switchValue, setSwitchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state?.Data || {};

    const changeSwitchValue = (event) => {
        setSwitchValue(event.target.value);
    };

    const switchTo = () => {
        if (switchValue === 'MERN STACK') {
            setMainMernPage(false);
            setIsMern(true);
        }
    };

    // Use effect to navigate based on state
    React.useEffect(() => {
        if (!mainMernPage && isMern) {
            navigate('/AdminPanelMernStack');
        }
    }, [mainMernPage, isMern, navigate]);

    // Function to toggle the hamburger menu
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
                                src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs"
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
                            <li className="nav-first-li-second">
                                <Link className="nav-link" to="">Sign Out</Link>
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
                            <input
                                type="text"
                                value={switchValue}
                                onChange={changeSwitchValue}
                                list="suggestions"
                                placeholder='Choose your section'
                            />
                            <datalist id="suggestions">
                                <option value="MERN STACK" />
                                <option value="BLOCKCHAIN" />
                                <option value="TRADING/SIGNALS" />
                                <option value="Add/Remove User" />
                                <option value="Update User/Admin/Password" />
                                <option value="Add/Remove Admin" />
                            </datalist>
                            <button onClick={switchTo} className='paid-btn-one'>Switch</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
