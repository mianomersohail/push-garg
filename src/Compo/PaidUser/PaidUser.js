import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaidUser.css';
import UserDealing from '../UserDealing/UserDealing';
import Navbar from '../Nav/NavList';
export default function PaidUser() {
    const [paidUser, setPaidUser] = useState(true);
    const [isDealing, setIsDealing] = useState(false);
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
    const signout = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            navigate('/userlogin'); // Adding a slight delay to check if it triggers
        }, 200); 
    };
    const interestRef = useRef();
    const switchTo = () => {
        const selectedValue = interestRef.current.value;
        if (selectedValue === 'DEALING') {
            setIsDealing(true);
        }
        console.log('Selected Interest:', selectedValue);
    };
    const messageChat = () => {
        navigate('/UserChat');
    }
    useEffect(() => {
        if (isDealing) {
            const timeout = setTimeout(() => {
                navigate('/UserDealing');
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isDealing, navigate]);
    if (paidUser) {
        return (
            <>
                <Navbar name={name || 'json'} navlinameone={'Messagse'} navlinametwo={'Sign Out'} onClick={signout} />
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
                                <button onClick={switchTo} className="paid-btn-one">Switch</button>
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
                {isDealing && <UserDealing />}
            </>
        );
    } return null;
}
