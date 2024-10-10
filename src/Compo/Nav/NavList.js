import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Nav.css';

const socket = io('http://localhost:3001'); // Server URL

export default function Navbar({ imgsrc, name, onClick, navlinameone, navlinametwo, linkone, showNotifications }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }
    };

    // Function to mark a specific notification as read
    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
        const unread = updatedNotifications.filter(notification => !notification.read).length;
        setUnreadCount(unread); // Update unread count
    };

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
        setNotifications(updatedNotifications);
        setUnreadCount(0); // Reset unread count
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleNotifications = () => {
        setShowNotificationsDropdown(!showNotificationsDropdown);
        if (!showNotificationsDropdown) {
            markAllAsRead(); // Mark all as read when dropdown is opened
        }
    };

    useEffect(() => {
        socket.on('NewSignal Uploaded', (message) => {
            const newNotification = { message: 'New trading signal uploaded!', read: false };
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
            setUnreadCount((prevCount) => prevCount + 1); // Increase unread count
        });

        return () => {
            socket.off('NewSignal Uploaded');
        };
    }, []);

    return (
        <div className="container offset-lg-1 offset-xxl-3">
            <div className="row nav-row">
                <div className="col-lg-5 nav-main">
                    <div className="nav-flex">
                        <img className="nav-first-img" src={imgsrc} alt="Profile" />
                        <p className="nav-bold">{name}</p>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        {isMenuOpen ? '✕' : '☰'}
                    </div>
                    <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                        <li><Link className="nav-linkss" to={linkone}>{navlinameone}</Link></li>
                        <li className="nav-first-li-second">
                            <Link className="nav-linkss" onClick={onClick}>
                                {navlinametwo}
                            </Link>
                        </li>
                    </ul>
                    {showNotifications && (
                        <div className={`bell-icon ${unreadCount > 0 ? 'shake' : ''}`} onClick={toggleNotifications}>
                            🔔
                            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                        </div>
                    )}
                    {showNotificationsDropdown && (
                        <div className="notification-dropdown">
                            {notifications.length === 0 ? (
                                <p>No new notifications</p>
                            ) : (
                                <ul>
                                    {notifications.map((note, index) => (
                                        <li
                                            key={index}
                                            className={note.read ? 'read' : 'unread'}
                                            onClick={() => markAsRead(index)} // Correct function call here
                                        >
                                            {note.message}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                    <button 
                        className={`theme-toggle-btn ${isDarkMode ? 'stars' : 'sun'}`} 
                        onClick={toggleTheme}
                    />
                </div>
            </div>
        </div>
    );
}
