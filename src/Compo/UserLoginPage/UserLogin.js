import './LoginPage.css';
import { useState, useEffect, useContext } from 'react';
import Navbar from '../Nav/NavList';
import Footer from '../Footer/Footer';
import useApi from '../FetchHook/FetchPost';
import { useNavigate } from 'react-router-dom';
import count from '../../contex/context';
export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverMessage, setServerMessage] = useState(null);
  const [username,setusername]=useState('')

  const navigation = useNavigate();
  const { loading, error, data, post } = useApi('http://localhost:3001'); 
  const {usename,setusename}=useContext(count)
  const submitLoginForm = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
    try {
      const result = await post('/Login', { email, password }, headers); 
      console.log(result)
      localStorage.setItem('image',result.image)
      if (result.token) {
        localStorage.setItem('token', result.token)
      }
     
      if (result.role == 'User') {
        console.log(result)
        localStorage.setItem('username',result.username)
        setusename(result.username)
        setusername(result.username)
        navigation('/paiduser')
      }
      if (result.role == 'Admin') {
        navigation('/AdminPanel');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Navbar imgsrc={'https://media.istockphoto.com/id/2043823329/photo/internet-network-cybersecurity-concept-data-privacy-protection-from-malicious-attacks-digital.webp?a=1&b=1&s=612x612&w=0&k=20&c=FD1lPgS6zHyR5RBUAQ84G-QnHpycZBfbzrfqDlaTlUk='} name={'Mian Omer'} navlinameone={'Home'} linktwo={'/'} linkone={'*'} />
      <div className="container Login-Page-Main">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="login-page-img"
              src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727442009142?e=1732752000&v=beta&t=02QmQeS0WM_hDBtm39AduhoW4cZFru3e4d-4CQeqsdc"
              alt="Login"
            />
          </div>
          <div className="col-lg-6">
            <form className="login-page-form" onSubmit={submitLoginForm}>
              <div><p style={{ color: '#06B5D3' }}>{serverMessage}</p></div>
              <div><h3>Login</h3></div>
              <div><label>Email/Phone</label></div>
              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="Enter your Email/Phone"
                  required
                />
              </div>
              <div><label>Password</label></div>
              <div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div><button type="submit">Login</button></div>
              {loading && (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              )}
              {error && <p>Error: {error.message}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
