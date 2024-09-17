
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PaidUser() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();
    const { name } = location.state?.Data || {};
    // Function to toggle the hamburger menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // useEffect to change the image after every few seconds
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
                            Hi Admin Hope your Day was Good Plz with Great Experience Plz Select Below the 
                            Section You want to Update for Users 
                        </p>
                        <div className='col-lg-6 floating-label'>
                        <input type="text" list="suggestions" placeholder='choose your section' />
                        <datalist id="suggestions">
                            <option value="MERN STACK" />
                            <option value="BLOCKCHAIN" />
                            <option value="TRADING/SIGNALS" />
                             <option value="Add/Remove User" />
                            <option value="Update User/Admin/Password" />
                            <option value="Add/Remove Admin" />
                        </datalist>
                        <button className='paid-btn-one'>Switch</button>


                    </div> 
                    </div>
                    
                </div>
            </div>
                            
        </>
    );
}
