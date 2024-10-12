import React from 'react';
import './Footer2.css'; // Import your enhanced CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>We are dedicated to providing the best service in the industry. Our team is passionate and committed.</p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: muhammadumersohail27@.gmail.com</p>
                    <p>Phone: +92-316-3865-813</p>
                </div>
                <div className="footer-section social">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Website. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
