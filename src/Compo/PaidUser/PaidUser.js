import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaidUser.css';

import Dealing from '../UserDealing/UserDealing'
import UserDealing from '../UserDealing/UserDealing';
export default function PaidUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [PaidUser, SetPaidUser] = useState(true);
    const [IsDealing, SetDealing] = useState(false); // Initialize with false only
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const { name } = location.state?.Data || {};
    
    const images = [
        'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/7567236/pexels-photo-7567236.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const deletesession = () => {
        localStorage.removeItem('token');
        navigate('/userlogin');
    };
    
    const interestRef = useRef();

    const switchto = () => {
        const selectedValue = interestRef.current.value;
        if (selectedValue === 'DEALING') {
            SetDealing(true);
        }
        console.log('Selected Interest:', selectedValue);
    };
    const messagechat=()=>{
        navigate('/UserChat')
    }

    // Effect to handle navigation to "/UserDealing"
    useEffect(() => {
        if (IsDealing) {
            navigate('/UserDealing');
            SetPaidUser(false);
        }
    }, [IsDealing, navigate]);

    if (PaidUser) {
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
                            <div className="hamburger" onClick={toggleMenu}>
                                {isMenuOpen ? '✕' : '☰'}
                            </div>
                            <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                                <li><i className="fas fa-envelope" onClick={messagechat}></i></li>
                                <li className="nav-first-li-second" onClick={deletesession}>
                                    Sign Out
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container offset-lg-1">
                    <div className="row Paid-User-Main">
                        <div className="col-lg-6 Paid-welcome">
                            <h1 style={{ color: '#4077B6' }}>Welcome {name || 'John'}</h1>
                            <p style={{ color: '#958984' }}>
                                Join us on a journey where you'll not only master the MERN stack 
                                but also gain insights that can transform your investment strategy. 
                                Our course is designed to guide you every step of the way—from 
                                building cutting-edge web applications to making informed investment 
                                decisions. Learn where to invest, how to invest smartly, and watch your 
                                skills and portfolio soar to new heights!
                            </p>
                            <div className="col-lg-6 floating-label">
                                <input ref={interestRef} type="text" className='paid-user-input-any' list="suggestions" placeholder="Your Interest" />
                                <datalist id="suggestions">
                                    <option value="MERN STACK" />
                                    <option value="BLOCKCHAIN" />
                                    <option value="DEALING" />
                                    <option value="TRADING/SIGNALS" />
                                </datalist>
                                <button onClick={switchto} className="paid-btn-one">Switch</button>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <img
                                className="paid-user-img"
                                src={images[currentImageIndex]}
                                alt="Slideshow"
                            />
                        </div>
                    </div>
                </div>
                <UserDealing/>
            </>
        );
    }

    return null; // In case `PaidUser` becomes false
}
