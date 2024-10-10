import './LoginPage.css';
import { useState, useEffect, useContext } from 'react';
import Navbar from '../Nav/NavList';
import Footer from '../Footer/Footer';
import useApi from '../FetchHook/FetchPost';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../usetoast/usetoast'; // Import the custom toast hook
import { Input } from '@chakra-ui/react'
export default function UserLogin() {
  const { showToast } = useCustomToast(); // Use the custom toast hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [serverMessage, setServerMessage] = useState(null);
  const [username,setusername]=useState('')

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
      localStorage.setItem('image',result.image)
      if (result.token) {
        localStorage.setItem('token', result.token)
      }
     
      if (result.role == 'User') {
        localStorage.setItem('username',result.username)
        setusername(result.username)
        navigation('/paiduser')
      }
      if (result.role == 'Admin') {
        navigation('/AdminPanel');
      }
    } catch (err) {
      showToast('error', 'Check Email Password And Try Agian...');

      console.error(err);
    }
  };
  return (
    <>
      <Navbar imgsrc={'https://media.licdn.com/dms/image/v2/D5622AQGtLVATlqQ3VA/feedshare-shrink_800/feedshare-shrink_800/0/1728340545336?e=1730937600&v=beta&t=jQdyuxozIrhfU9xPT9h7-e4DjpE8FwEz00yqzB_ln78'} name={'Mian Omer'} navlinameone={'Home'} linktwo={'/'} linkone={'*'} />
      <div className="container Login-Page-Main">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="login-page-img"
              src="https://media.licdn.com/dms/image/v2/D5622AQGtLVATlqQ3VA/feedshare-shrink_800/feedshare-shrink_800/0/1728340545336?e=1730937600&v=beta&t=jQdyuxozIrhfU9xPT9h7-e4DjpE8FwEz00yqzB_ln78"
              alt="Login"
            />
          </div>
          <div className="col-lg-6">
            <form className="login-page-form" onSubmit={submitLoginForm}>
              <div><p style={{ color: '#06B5D3' }}>{serverMessage}</p></div>
              <div><h3>Login</h3></div>
              <div><label>Email/Phone</label></div>
              {/* <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="Enter your Email/Phone"
                  required
                />
              </div> */}
              <div>
                <Input placeholder='Enter Your Email' value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                
                  required size='md' />
                  </div>

              <div><label>Password</label></div>
              {/* <div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  required
                />
              </div> */}
              <div>
              <Input placeholder='Enter Your Password' size='md'value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
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
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
