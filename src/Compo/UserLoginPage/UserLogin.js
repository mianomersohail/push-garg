import './LoginPage.css';
import { useState, useEffect, useContext } from 'react';
import Navbar from '../Nav/NavList';
import Footer from '../Footer2.js/Footer2'
import { Link } from 'react-router-dom';
import useApi from '../FetchHook/FetchPost';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../usetoast/usetoast'; // Import the custom toast hook
import { Input } from '@chakra-ui/react'
import errorsound from '../../audio/error.mp3'
export default function UserLogin() {
  const { showToast } = useCustomToast(); // Use the custom toast hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverMessage, setServerMessage] = useState(null);
  const [username, setusername] = useState('')
  const navigation = useNavigate();
  const { loading, error, data, post } = useApi('http://localhost:3001');
  const submitLoginForm = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await post('/Login', { email, password }, headers);
      console.log(result)
      if (result.Result.token) {
        localStorage.setItem('token', result.Result.token)
      }

      if (result.Result.role == 'User') {
        localStorage.setItem('image', result.Result.image)
        localStorage.setItem('username', result.Result.username)
        localStorage.setItem('userId', result.Result.userId)
        setusername(result.username)
        navigation('/paiduser')
      }
      if (result.Result.role == 'Admin') {
        localStorage.setItem('image', result.Result.image)
        localStorage.setItem('username', result.Result.username)
        localStorage.setItem('userId', result.Result.userId)
        navigation('/AdminPanel');
      }
    } catch (err) {
      const audio = new Audio(errorsound); // Create a new audio object
      audio.play(); // Play the audio
      showToast('error', 'Check Email Password And Try Agian...');
      console.error(err);
    }
  };
  return (
    <>
      <Navbar   imgsrc={'https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg'} name={'Mian Omer'} navlinameone={'Home'} linktwo={'/'} linkone={'*'} />
      <div className="container Login-Page-Main">
        <div className="row">
          <div className="col-lg-4">
            <img
              className="login-page-img"
              src="https://media.licdn.com/dms/image/v2/D5622AQGnRLSb1Awggw/feedshare-shrink_800/feedshare-shrink_800/0/1728720237857?e=1731542400&v=beta&t=IH5gJnn19vOpp5xzOYkclVvaS-Kk1X7ZSOk0cm_BxeE"
              alt="Login"
            />
          </div>
          <div className="col-lg-8">
            <form className="login-page-form" onSubmit={submitLoginForm}>
              <div><p style={{ color: '#06B5D3' }}>{serverMessage}</p></div>
              <div className='login-center'><h3>Login</h3></div>
              <div><label className='login-center'>Email/Phone</label></div>

              <div className='login-center'>
                <Input placeholder='Enter Your Email' value={email}

                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"

                  required size='md' />
              </div>

              <div className='login-center'><label>Password</label></div>

              <div className='login-center'>
                <Input placeholder='Enter Your Password' size='md' value={password}

                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                /> 

              </div>
              <Link className='login-center signup-link' to="/SignUpUser">Sign Up</Link>
              <div className='login-center '><button type="submit">Login</button></div>
              
              {loading && (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
