import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar({name,onClick,navlinameone,navlinametwo,errormessage,linkone}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)}
        return (
            <div className="container offset-lg-1">
                <div className="row nav-row">
                    <p>{errormessage}</p>
                    <div className="col-lg-5 nav-main">
                        <div className="nav-flex">
                            <img
                                className="nav-first-img"
                                src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727442009142?e=1732752000&v=beta&t=02QmQeS0WM_hDBtm39AduhoW4cZFru3e4d-4CQeqsdc"
                                alt="Profile"
                            />
                            <p className="nav-bold">{name}</p>
                        </div>
                        {/* Hamburger Icon */}
                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? '✕' : '☰'}
                        </div>
                        {/* Nav Items */}
                        <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                            <li><Link className="nav-linkss" to={linkone}>{navlinameone}</Link></li>
                            <li className="nav-first-li-second">
                                <Link className="nav-linkss" onClick={onClick} >
                                    {navlinametwo}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
}