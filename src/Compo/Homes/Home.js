import './Home.css';
import { useContext, useEffect, useState } from 'react';
import useApi from '../FetchHook/FetchPost';
import Navbar from '../Nav/NavList';
import WorkExperience from '../workexp/workexp';
import Courses from '../courses/Courses';
import Trusted from '../trustedanimation/Trusted';
import Footer from '../Footer2.js/Footer2'
import TypingEffect from 'react-typing-effect';
import FillingEffect from '../FillingEffect/FillingEffect';
import CountEffect from '../CountEffect/CountEffect';
import EthSection from '../EthSection/EthSection';
import HomeList from '../Homes/HomeList';
import Links from '../Homes/staticdata';
import { useNavigate } from 'react-router-dom';
import Chat from '../UserChat/UserChat'
import useCustomToast from '../usetoast/usetoast'; // Import the custom toast hook
const LinkData = Links;
export default function Home() {
  const { showToast } = useCustomToast(); // Use the custom toast hook
  const [username, setusername] = useState()
  const navigation = useNavigate();
  const { loading, error, data, post, get } = useApi('http://localhost:3001');
  const namefromlocal = localStorage.getItem('username')
  const image = localStorage.getItem('image')
  const cvdownload = async () => {
    try {
      const result = await get('/Cv', { headers: { 'Content-Type': 'application/pdf' } });

      // To trigger download, you can use the following line:
      const blob = new Blob([result], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Umer_Sohail_CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      showToast('error', 'Cv Not found.');

      console.log(error);
    }
  };
  const navlogin = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await post('/NavLogin', {}, headers);
      console.log(result)
      if (result.message == 'No token provided' || result.message == 'Invalid or expired token') {
        navigation('/userlogin');
      }
      if (result.user.role == 'User') {
        const checkuser = localStorage.getItem('username')
        if (checkuser) {
          setusername(result.user.username)
          navigation('/paiduser')

        }
        else {
          localStorage.setItem('username', result.user.username)
          setusername(result.user.username)
          return navigation('/paiduser')
        }
        // setusername(result.user.username)
        // setusename(result.user.username)
        // navigation('/paiduser')
        // navigation('/paiduser',{ state: { Data: { username:result.user.username } } })
      }
      if (result.user.role == 'Admin') {
        return navigation('/AdminPanel')
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'No Token Found');

    }
  };

  
  const baseURL = 'http://localhost:3001/';
  const imgURL = image ? `${baseURL}${image}` : 'https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg';


  return (
    <>
      <Navbar
        imgsrc={imgURL}
        name={namefromlocal || 'Welcome Coders'}
        navlinameone={'Docs'}
        navlinametwo={namefromlocal ? 'WelcomeBack' : 'Login'} // Optional chaining to avoid error
        linkone={'/Documentation'}
        onClick={navlogin}
        showNotifications={!!namefromlocal} // Pass true if username exists

      />


      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      <div className='container offset-lg-1 offset-xxl-1' >
        <div className='row'>
          <div className='col-lg-6 home-main'>
            <TypingEffect
              text={['REACT JS', 'NODE+EXPRESS JS', 'BLOCKCHAIN SOFT DEV','MONGO DB','RESTFULL API`S', 'FOREX TRADER']}
              speed={50}
              eraseDelay={1500}

              typingDelay={500}
              cursorColor='#06B6D4'
              displayTextRenderer={text => (
                <h3 className='home-typing-animation'>
                  {text.split('').map((char, i) => (
                    <span className='typing-home' key={i} style={{ color: char === ' ' ? 'inherit' : '#06B6D4' }}>{char}</span>
                  ))}
                </h3>
              )}
            />
            <p className='home-p-one'>
              I’m Muhammad Umer Sohail. Over 3+ years experience in trading markets, working in Lahore, I have played an essential role in developing and improving a wide range of digital products and services...
            </p>
            <p style={{ color: "#73737A" }}>~ Trading</p>
            <p className="home-p-one">Part Time Trading when I'm not working on my day job.</p>
            <button className='cv-download' onClick={cvdownload}>MY CV download</button>
          </div>
          <div className="col-lg-4 offset-lg-1">
            <img className="home-img-one" src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727442009142?e=1733961600&v=beta&t=TRxeRmiPOkpKjphyNUpfIavbSmIfAoDP4JWwTS5PqXs" alt="Profile" />
            <div>
              <ul className='home-first-ul'>
                {LinkData.map((item, index) => (
                  <HomeList key={index} HomeFirstLink={item.HomeFirstLink} i1={item.i1} to1={item.to1} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <WorkExperience />
      <FillingEffect />
      <CountEffect />
      <Courses />
      <Chat />
      <EthSection />
      <Trusted />
      <Footer />
    </>
  );
}
