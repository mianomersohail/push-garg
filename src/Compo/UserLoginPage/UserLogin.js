import Footer from "../Footer/Footer";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Nav/NavList";
import UseFetch from "../FetchHook/FetchPost";
export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const [fetchUrl, setFetchUrl] = useState(null); // State to hold the URL

    console.log('login paage ',window.location.href)
    const navigate = useNavigate();

    // Handle email input change
    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    // Handle password input change
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
//   const { data, loading, error } = UseFetch(fetchUrl,email,password); // Call useFetch with the URL
//   setFetchUrl('http://localhost:3001/NavLogin'); // Set the URL to call when button is clicked

    // Handle form submission
    // const submitLoginForm = async (event) => {
    //     event.preventDefault();
    //     try {
    //         // Send login request to the backend
    //         const response = await fetch('http://localhost:3001/Login', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': "application/json",
    //             },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         // Clear form fields after submission
    //         setEmail('');
    //         setPassword('');

    //         // If login fails
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             if (errorData.message === 'Invalid credentials') {
    //                 setServerMessage('Invalid credentials. Please try again.');
    //             } else {
    //                 setServerMessage('Login failed. Please try again.');
    //             }
    //             return;
    //         }

    //         // Handle successful login
    //         const Data = await response.json();
    //         console.log("Data from server:", Data);

    //         if (Data.Data.role == 'Admin') {
    //             console.log("Navigating to AdminPanel");
    //             alert("Admin logged in");
    //             navigate('/AdminPanel');
    //         } else if (Data.Data.role == 'User') {
    //             console.log("Navigating to paiduser");
    //             navigate('/paiduser');
    //         } else {
    //             setServerMessage('Unknown role');
    //         }
    //     } catch (error) {
    //         setServerMessage(error.message || 'An error occurred. Please try again.');
    //     }
    // };
    const submitLoginForm=(event)=>{
        event.preventDefault()
        UseFetch(fetchUrl,email,password)
        setFetchUrl('http://localhost:3001/Login'); // Set the URL to call when button is clicked

    }
    return (
        <>
            <Navbar name={'Mian Omer'} navlinameone={'Home'} linktwo={'/'} linkone={'*'} />
            <div className="container Login-Page-Main">
                <div className="row">
                    <div className="col-lg-6">
                        <img className="login-page-img" src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727442009142?e=1732752000&v=beta&t=02QmQeS0WM_hDBtm39AduhoW4cZFru3e4d-4CQeqsdc" alt="Login" />
                    </div>
                    <div className="col-lg-6">
                        <form className="login-page-form" onSubmit={submitLoginForm}>
                            <div><p style={{ color: '#06B5D3' }}>{serverMessage}</p></div>
                            <div><h3>Login</h3></div>
                            <div><label>Email/Phone</label></div>
                            <div>
                                <input value={email} onChange={emailChange} name="email" type="email" placeholder="Enter your Email/Phone" required />
                            </div>
                            <div><label>Password</label></div>
                            <div>
                                <input value={password} onChange={passwordChange} name="password" type="password" placeholder="Enter Your Password" required />
                            </div>
                            <div><button type="submit">Login</button></div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
