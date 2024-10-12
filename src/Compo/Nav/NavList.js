import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import useApi from '../FetchHook/FetchPost';
import './Nav.css';
import useCustomToast from '../usetoast/usetoast';

const userId = localStorage.getItem('userId'); // User ID
const socket = io('http://localhost:3001', { query: { userId } });

export default function Navbar({ imgsrc, name, onClick, navlinameone, navlinametwo, linkone, showNotifications }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { showToast } = useCustomToast();
    const { loading, get } = useApi('http://localhost:3001');

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            document.body.classList.toggle('light-mode', !prev);
            document.body.classList.toggle('dark-mode', prev);
            return !prev;
        });
    };

    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
        setUnreadCount(updatedNotifications.filter(notification => !notification.read).length);
    };

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
        setNotifications(updatedNotifications);
        setUnreadCount(0);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const toggleNotifications = async () => {
        setShowNotificationsDropdown(prev => !prev);
        if (!showNotificationsDropdown) {
            await fetchNotifications();
        } else {
            markAllAsRead();
        }
    };

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const result = await get('/Notifications', {}, headers);
            if (result && result.unreadNotifications) {
                // Filter out duplicates
                const newNotifications = result.unreadNotifications.filter(
                    newNote => !notifications.some(note => note.message === newNote.message)
                );
                setNotifications(prev => [...prev, ...newNotifications]);
                setUnreadCount(prev => prev + newNotifications.length);
            }
        } catch (err) {
            console.error(err);
            showToast('error', 'No Token Found');
        }
    };

    useEffect(() => {
        fetchNotifications(); // Fetch notifications on initial load

        socket.on('NewSignal Uploaded', (data) => {
            console.log('Notification received:', data);
            const newNotification = { message: 'New trading signal uploaded!', read: false };
            // Only add if not already present
            if (!notifications.some(note => note.message === newNotification.message)) {
                setNotifications(prev => [...prev, newNotification]);
                setUnreadCount(prev => prev + 1);
            }
        });

        return () => {
            socket.off('NewSignal Uploaded'); // Clean up socket listener
        };
    }, []); // Empty dependency array to run only on mount

    return (
        <div className="container offset-lg-1">
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
                    {loading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <p>Loading...</p>
                        </div>
                    )}
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
                                            onClick={() => markAsRead(index)}
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
