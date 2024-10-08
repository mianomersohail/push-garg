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

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
        setNotifications(updatedNotifications);
        setUnreadCount(0); // Reset unread count
    };

    // Function to mark a specific notification as read
    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true; // Mark the notification at the given index as read
        setNotifications(updatedNotifications);
        setUnreadCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); // Decrease unread count
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
        // Listen for new notifications from the server
        socket.on('NewSignal Uploaded', (message) => {
            const newNotification = { message: 'New trading signal uploaded!', read: false };
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
            setUnreadCount((prevCount) => prevCount + 1); // Increase unread count
        });

        // Clean up the event listener on unmount
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
                    {/* Bell Icon for Notifications, shown based on the prop */}
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
                                            onClick={() => markAsRead(index)} // Call markAsRead when clicking the notification
                                        >
                                            {note.message}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
