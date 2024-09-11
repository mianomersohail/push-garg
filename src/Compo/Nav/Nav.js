import './Nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle function for opening and closing the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className='container offset-lg-1'>
                <div className='row nav-row'>
                    <div className="col-lg-4 nav-main">
                        <div className="nav-flex">
                            <img className='nav-first-img' src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs" alt="Profile" />
                            <p className='nav-bold'>Mian Omer</p>
                        </div>
                        
                        {/* Hamburger Icon */}
                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? '✕' : '☰'}
                        </div>

                        {/* Nav Items */}
                        <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                            <li><Link className='nav-link' to="/about">About</Link></li>
                            <li className='nav-first-li-second'><Link className='nav-link' to="">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
