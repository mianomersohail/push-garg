import React, { useState, useEffect, useRef, useContext } from 'react';
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
    // const { username } = location.state?.Data || {};
   
   
    const signout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('image')
        setTimeout(() => {
            navigate('/userlogin');
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
    // name={username || 'welcome'}
    const username = localStorage.getItem('username')
    
    const baseURL = 'http://localhost:3001/'; // Replace with your actual base URL
    const imgPath = localStorage.getItem('image')
    const imgURL = `${baseURL}${imgPath}`;
            
    if (paidUser) {
        return (
            <>
                <Navbar imgsrc={imgURL} alt="User" name={username || 'welcome'} navlinameone={<i class="fa fa-bell-o" style={{ fontSize: "24px" }}></i>} navlinametwo={'Sign Out'} onClick={signout} />
                <div className="container offset-lg-1">
                    <div className="row Paid-User-Main">
                        <div className="col-lg-6 Paid-welcome">
                            <h1 style={{ color: '#4077B6' }}>Welcome {username || ' USER'}</h1>
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
                       
                    </div>
                </div>
                {isDealing && <UserDealing />}
            </>
        );
    } return null;
}
