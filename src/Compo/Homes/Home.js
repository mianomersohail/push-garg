// Home.js
import './Home.css';
import { useEffect } from 'react';
import useApi from '../FetchHook/FetchPost';
import Navbar from '../Nav/NavList';
import WorkExperience from '../workexp/workexp';
import Courses from '../courses/Courses';
import Trusted from '../trustedanimation/Trusted';
import Footer from '../Footer/Footer';
import TypingEffect from 'react-typing-effect';
import FillingEffect from '../FillingEffect/FillingEffect';
import CountEffect from '../CountEffect/CountEffect';
import EthSection from '../EthSection/EthSection';
import HomeList from '../Homes/HomeList';
import Links from '../Homes/staticdata';
import { useNavigate } from 'react-router-dom';
const LinkData = Links;
export default function Home() {
  const navigation = useNavigate();
  const { loading, error, data, get } = useApi('http://localhost:3001');
  const navlogin = async () => {
    const token=localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`, 
    };
    try {
      const result = await get('/NavLogin', headers); 
      console.log(result.message); 
      if (result.message == 'No token provided' || result.message == 'Invalid or expired token') {
        navigation('/userlogin');
        console.log('Navigating to User Login');
      }
      console.log(result.user.role)
      if(result.user.role=='User'){
        navigation('/paiduser')
      }
      if(result.user.role=='Admin'){
        navigation('/AdminPanel')
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <Navbar
        name={'Mian Omer'}
        navlinameone={'Docs'}
        navlinametwo={'Login'}
        linkone={'/Documentation'}
        onClick={navlogin}
      />
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error.message}</div>}
      <div className='container offset-lg-1'>
        <div className='row'>
          <div className='col-lg-6 home-main'>
            <TypingEffect
              text={['I\'m a ReactJS Developer', 'NodeJs+ExpressJs', 'BLOCKCHAIN', 'FOREX TRADER']}
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
            <button className='cv-download'>MY CV download</button>
          </div>
          <div className="col-lg-4 offset-lg-1">
            <img className="home-img-one" src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727442009189?e=1733356800&v=beta&t=ik-mEXDtm2bAI_kbluGVvOR9Fmo_eG_FwGWytS_ceTM" alt="Profile" />
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
      <EthSection />
      <Trusted />
      <Footer />
    </>
  );
}
