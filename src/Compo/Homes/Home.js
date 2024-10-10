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
          navigation('/paiduser')
        }
        // setusername(result.user.username)
        // setusename(result.user.username)
        // navigation('/paiduser')
        // navigation('/paiduser',{ state: { Data: { username:result.user.username } } })
      }
      if (result.user.role == 'Admin') {
        navigation('/AdminPanel')
      }
    } catch (err) {
      console.error(err);
      showToast( 'error','No Token Found');

    }
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <Navbar
        imgsrc={'https://media.licdn.com/dms/image/v2/D5622AQGcfzrXrBLDkA/feedshare-shrink_800/feedshare-shrink_800/0/1728340701041?e=1730937600&v=beta&t=L5wJ7fcORdsKVARAC7xGIMM9qs5jM27o66KH4VFAYx4'}
        name={'Mian Omer'}
        navlinameone={'Docs'}
        navlinametwo={'Login'}
        linkone={'/Documentation'}
        onClick={navlogin}
        showNotifications ={false}
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
              text={['REACT JS', 'NODEJS+EXPRESS JS', 'ETH/BLOCKCHAIN', 'FOREX TRADER']}
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
            <img className="home-img-one" src="https://media.licdn.com/dms/image/v2/D5622AQG0tF4iC4n2cw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1728340315513?e=1730937600&v=beta&t=jKmVwqZOBhRus1n9QUjJ-HorhfY_r-6--euL7MS2V8o" alt="Profile" />
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
      <Chat/>
      <EthSection />
      <Trusted />
      <Footer />
    </>
  );
}
