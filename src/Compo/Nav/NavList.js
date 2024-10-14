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
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Update localStorage
    };

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
        setNotifications(updatedNotifications);
        setUnreadCount(0);
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Update localStorage
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
                const newNotifications = result.unreadNotifications.filter(
                    newNote => !notifications.some(note => note.message === newNote.message)
                );
                setNotifications(prev => {
                    const updatedNotifications = [...prev, ...newNotifications];
                    localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Update localStorage
                    return updatedNotifications;
                });
                setUnreadCount(prev => prev + newNotifications.length);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const loadNotificationsFromLocalStorage = () => {
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            const parsedNotifications = JSON.parse(storedNotifications);
            setNotifications(parsedNotifications);
            setUnreadCount(parsedNotifications.filter(note => !note.read).length);
        }
    };

    useEffect(() => {
        loadNotificationsFromLocalStorage(); // Load notifications from local storage on mount
        fetchNotifications(); // Fetch notifications from API on initial load

        socket.on('NewSignal Uploaded', (data) => {
            const newNotification = { message: 'New trading signal uploaded!', read: false };
            if (!notifications.some(note => note.message === newNotification.message)) {
                setNotifications(prev => {
                    const updatedNotifications = [...prev, newNotification];
                    localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Update localStorage
                    return updatedNotifications;
                });
                setUnreadCount(prev => prev + 1);
            }
        });

        return () => {
            socket.off('NewSignal Uploaded'); // Clean up socket listener
        };
    }, []); // Empty dependency array to run only on mount

    // Separate unread and read notifications
    const unreadNotifications = notifications.filter(note => !note.read);
    const readNotifications = notifications.filter(note => note.read);

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
                    {showNotifications && (
                        <div className={`bell-icon ${unreadCount > 0 ? 'shake' : ''}`} onClick={toggleNotifications}>
                            🔔
                            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                        </div>
                    )}
                    {showNotificationsDropdown && (
                        <div className="notification-dropdown">
                            {unreadNotifications.length === 0 && readNotifications.length === 0 ? (
                                <p>No new notifications</p>
                            ) : (
                                <>
                                    {unreadNotifications.length > 0 && (
                                        <div>
                                            <strong>Unread Notifications</strong>
                                            <ul>
                                                {unreadNotifications.map((note, index) => (
                                                    <li
                                                        key={index}
                                                        className="unread"
                                                        onClick={() => markAsRead(notifications.indexOf(note))}
                                                    >
                                                        {note.message}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {readNotifications.length > 0 && (
                                        <div>
                                            <strong>Read Notifications</strong>
                                            <ul>
                                                {readNotifications.map((note, index) => (
                                                    <li key={index} className="read">
                                                        {note.message}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
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
