import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../FetchHook/FetchPost';
import Navbar from '../Nav/NavList';
import WorkExperience from '../workexp/workexp';
import Courses from '../courses/Courses';
import Trusted from '../trustedanimation/Trusted';
import Footer from '../Footer/Footer';
import BitcoinPrice from '../BitcoinPrice/Bitcoinprice';
import TypingEffect from 'react-typing-effect';
import FillingEffect from '../FillingEffect/FillingEffect';
import CountEffect from '../CountEffect/CountEffect';
import EthSection from '../EthSection/EthSection';
import HomeList from '../Homes/HomeList';
import Links from '../Homes/staticdata';

const LinkData = Links;

export default function Home() {
  const navigation=useNavigate()
  const { loading, error, sendRequest } = useHttp();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest('http://localhost:3001/NavLogin');
        setData(responseData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [sendRequest]);

  const getReq = async () => {
    try {
      const responseData = await sendRequest('http://localhost:3001/NavLogin', 'GET');
      console.log('invalid',responseData);
      if(responseData=='Invalid Token'){
        navigation("/userlogin")
      } // Handle the response data as needed
      // You can update your state or perform other actions based on the response
      setData(responseData); // Example: update state with the response data
    } catch (err) {
      console.error(err);
    }
  };

  const navlogin = () => {
    // Your navigation logic here if needed
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Navbar 
        name={'Mian Omer'} 
        navlinameone={'Docs'} 
        navlinametwo={'Login'} 
        onClick={getReq} 
        linkone={'/Documentation'}  
      />
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
              I’m Muhammad Umer Sohail. Over a 3+ years experience in trading markets,
              working in Lahore, I have played an essential role in developing and improving a
              wide range of digital products and services across different industries and
              business models and Ecommerce platforms where I have found my biggest
              passion. Paying close attention to user feedback, spotting user behavior patterns,
              and iterating from there has always been my motto.
            </p>
            <p style={{ color: "#73737A" }}>~ Trading</p>
            <p className="home-p-one">Part Time Trading when I'm not working on my day job.</p>
            <button className='cv-download'>MY CV download</button>
          </div>
          <div className="col-lg-4 offset-lg-1">
            <img
              className="home-img-one"
              src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727442009142?e=1732752000&v=beta&t=02QmQeS0WM_hDBtm39AduhoW4cZFru3e4d-4CQeqsdc"
              alt="Profile"
            />
            <div>
              <div>
                <ul className='home-first-ul'>
                  {LinkData.map((item, index) => (
                    <HomeList
                      key={index}
                      HomeFirstLink={item.HomeFirstLink}
                      i1={item.i1}
                      to1={item.to1}
                    />
                  ))}
                </ul>
              </div>
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
