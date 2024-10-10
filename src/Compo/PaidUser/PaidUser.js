import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaidUser.css';
import UserDealing from '../UserDealing/UserDealing';
import Navbar from '../Nav/NavList';
import { io } from 'socket.io-client';
import MenuLists from '../../menulist/menulist';

const socket = io('http://localhost:3001'); // Server URL

export default function PaidUser() {
    const [paidUser, setPaidUser] = useState(true);
    const [isDealing, setIsDealing] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [shakeBell, setShakeBell] = useState(false);
    const [serverMessage, setServerMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('NewSignal Uploaded', (message) => {
            setServerMessage(message);
            setNotifications(prevNotifications => [...prevNotifications, message]);
            setShakeBell(true);
        });

        return () => {
            socket.off('NewSignal Uploaded');
        };
    }, []);

    const signout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('image');

        setTimeout(() => {
            navigate('/userlogin');
        }, 200);
    };

    const handleMenuClick = (selectedValue) => {
        if (selectedValue === 'DEALING') {
            setIsDealing(true);
        } else if (selectedValue === 'TRADING/SIGNALS') {
            navigate('/FrontEndTrading');
        }
        console.log('Selected Interest:', selectedValue);
    };

    useEffect(() => {
        if (isDealing) {
            const timeout = setTimeout(() => {
                navigate('/UserDealing');
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isDealing, navigate]);

    const username = localStorage.getItem('username') || 'welcome';
    const baseURL = 'http://localhost:3001/';
    const imgPath = localStorage.getItem('image');
    const imgURL = `${baseURL}${imgPath}`;

    if (paidUser) {
        return (
            <>
                <Navbar
                    shakeBell={shakeBell}
                    notifications={notifications}
                    imgsrc={imgURL}
                    alt="User"
                    name={username}
                    navlinameone={'Home'}
                    linkone={'*'}
                    navlinametwo={'Sign Out'}
                    onClick={signout}
                    showNotifications={true}
                />
                <div className="container offset-lg-1">
                    <div className="row Paid-User-Main">
                        <div className="col-lg-6 Paid-welcome">
                            <h1 style={{ color: '#4077B6' }}>Welcome {username}</h1>
                            <p style={{ color: '#958984' }}>
                                Join us on a journey where you'll not only master the MERN stack
                                but also gain insights that can transform your investment strategy.
                                Our course is designed to guide you every step of the way—from
                                building cutting-edge web applications to making informed investment
                                decisions. Learn where to invest, how to invest smartly, and watch your
                                skills and portfolio soar to new heights!
                            </p>
                            <div className='MenuLists'>

                            <MenuLists 
                            
                            valueone={'MERN STACK'} 
                            valuetwo={'BLOCKCHAIN'} 
                            valuethree={'DEALING'} 
                            valuefour={'TRADING/SIGNALS'}
                            onSelect={handleMenuClick} // Pass the click handler
                            />
                            </div>
                        </div>
                    </div>
                </div>

                {isDealing && <UserDealing />}
            </>
        );
    }

    return null;
}
