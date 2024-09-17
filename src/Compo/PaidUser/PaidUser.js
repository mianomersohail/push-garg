import './PaidUser.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PaidUser() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const location = useLocation();
    const { name } = location.state?.Data || {};

    // Array of images for the slideshow
    const images = [
        'https://c4.wallpaperflare.com/wallpaper/954/215/622/wl-bird-predator-eyes-wallpaper-preview.jpg',
        'https://c4.wallpaperflare.com/wallpaper/410/920/842/wl-bird-flying-predator-wallpaper-preview.jpg',
        'https://c4.wallpaperflare.com/wallpaper/511/184/893/emilia-clarke-wl-2017-wallpaper-preview.jpg'
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds
    
        const imgElement = document.querySelector('.paid-user-img');
        imgElement.classList.remove('show'); // Reset the transition
        setTimeout(() => {
            imgElement.classList.add('show'); // Apply transition after a brief delay
        }, 50);
    
        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [currentImageIndex, images.length]);
    

    // Function to toggle the hamburger menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // useEffect to change the image after every few seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [images.length]);

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
                            <li><Link className="nav-link" to=""><i className="fas fa-envelope"></i></Link></li>
                            <li className="nav-first-li-second">
                                <Link className="nav-link" to="">Sign Out</Link>
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
