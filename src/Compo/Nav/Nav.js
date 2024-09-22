import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PaidUser from '../PaidUser/PaidUser';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [Authenticate, SetAuthenticate] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleget = async () => {
        try {
            const sessionData = localStorage.getItem('token');
            const Response = await fetch('http://localhost:3001/Login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionData}`,
                },
            });
            if (!Response) {
                alert('Server-Not-Response');
                return;
            }
            const Data = await Response.json();
            if (Data.message === 'Authorized' && Data.role === 'Admin') {
                SetAuthenticate(true);
                navigate('/AdminPanel', { state: { Data } });
            } else if (Data.message === 'Authorized' && Data.role === 'User') {
                navigate('/PaidUser', { state: { Data } });
            } else if (Data.message === 'Plz-Login') {
                navigate('/userlogin');
            } else if (Data.errormessage) {
                alert(Data.errormessage);
            }
        } catch (error) {
            alert('Error while Login');
        }
    };

    if (Authenticate === false) {
        return (
            <div className="container offset-lg-1">
                <div className="row nav-row">
                    <div className="col-lg-5 nav-main">
                        <div className="nav-flex">
                            <img
                                className="nav-first-img"
                                src="https://media.licdn.com/dms/image/v2/D5603AQHNxqJ-f0xuuQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726896992279?e=1732752000&v=beta&t=OKZ_z1ZLv_AIjc9CqeqXcTbHBEy6M9o2foOgHYbIMaY"
                                alt="Profile"
                            />
                            <p className="nav-bold">Mian Omer</p>
                        </div>

                        {/* Hamburger Icon */}
                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? '✕' : '☰'}
                        </div>

                        {/* Nav Items */}
                        <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                            <li><Link className="nav-linkss" to="/Documentation">Docs</Link></li>
                            <li className="nav-first-li-second">
                                <Link className="nav-linkss" onClick={handleget} to="/">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


}
