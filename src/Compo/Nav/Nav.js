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
                    <div className="col-lg-4 nav-main">
                        <div className="nav-flex">
                            <img
                                className="nav-first-img"
                                src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs"
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
                            <li><Link className="nav-link" to="/Documentation">Documentation</Link></li>
                            <li className="nav-first-li-second">
                                <Link className="nav-link" onClick={handleget} to="">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (Authenticate === true) {
        return <PaidUser />;
    }
}
