import React, { useState, useEffect } from 'react'; // Import useState and useEffect from react
import { useLocation, useNavigate } from 'react-router-dom';
import './PaidUser.css';

export default function PaidUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const location = useLocation();
    const navigate = useNavigate(); // Declare navigate
    
    const { name } = location.state?.Data || {};
    
    // Array of images for the slideshow
    const images = [
        'https://w0.peakpx.com/wallpaper/406/711/HD-wallpaper-code-programming-text-strings-multicolored.jpg',
        'https://w0.peakpx.com/wallpaper/380/640/HD-wallpaper-forex-trading-vectors-stock-psd-chart-pattern.jpg',
        'https://w0.peakpx.com/wallpaper/806/541/HD-wallpaper-technology-blockchain.jpg'
    ];
    
    // Slideshow Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);
    
    // Function to toggle the hamburger menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to delete the session (token) and navigate to login page
    const deletesession = () => {
        localStorage.removeItem('token'); // Delete the token from localStorage
        navigate('/userlogin'); // Navigate to user login after deleting token
    };

    return (
        <>
            <div className="container offset-lg-1">
                <div className="row nav-row">
                    <div className="col-lg-4 nav-main">
                        <div className="nav-flex">
                            <img
                                className="nav-first-img"
                                src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs"
                                alt="Profile"
                            />
                            <p className="nav-bold">{name || 'WELCOME'}</p>
                        </div>

                        {/* Hamburger Icon */}
                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? '✕' : '☰'}
                        </div>

                        {/* Nav Items */}
                        <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                            <li><i className="fas fa-envelope"></i></li>
                            <li className="nav-first-li-second" onClick={deletesession}>
                                Sign Out
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className='container offset-lg-1'>
                <div className='row Paid-User-Main'>
                    <div className='col-lg-6 Paid-welcome'>
                        <h1 style={{color:'#4077B6'}}>Welcome {name || 'John'}</h1>
                        <p style={{color:'#958984'}}>
                            Join us on a journey where you'll not only master the MERN stack 
                            but also gain insights that can transform your investment strategy. 
                            Our course is designed to guide you every step of the way—from 
                            building cutting-edge web applications to making informed investment 
                            decisions. Learn where to invest, how to invest smartly, and watch your 
                            skills and portfolio soar to new heights!
                        </p>
                        <div className='col-lg-6 floating-label'>
                            <input type="text" list="suggestions" placeholder='Your Interest' />
                            <datalist id="suggestions">
                                <option value="MERN STACK" />
                                <option value="BLOCKCHAIN" />
                                <option value="TRADING/SIGNALS" />
                            </datalist>
                            <button className='paid-btn-one'>Switch</button>
                        </div> 
                    </div>
                    <div className='col-lg-6'>
                        <img 
                            className='paid-user-img' 
                            src={images[currentImageIndex]} 
                            alt="Slideshow"
                        />
                    </div> 
                </div>
            </div>
        </>
    );
}
