import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Nav/Nav'
import WorkExperience from '../workexp/workexp';
import Courses from '../courses/Courses';
import Trusted from '../trustedanimation/Trusted';
import Footer from '../Footer/Footer';
import BitcoinPrice from '../BitcoinPrice/Bitcoinprice';
import TypingEffect from 'react-typing-effect';
import FillingEffect from '../FillingEffect/FillingEffect';
import CountEffect from '../CountEffect/CountEffect';
import Eth from '../Web3/MakeUserDeal/MakeUserDeal'
import EthSection from '../EthSection/EthSection';

export default function Home() {
  const cvdownload = async () => {
    try {
      const response = await fetch('http://localhost:3001/Cv', {
        method: "GET",
      });
  
      // Check if the response status is OK (status code 200-299)
      // if (!response.ok) {
      //   throw new Error('Failed to fetch the CV');
      // }
  
      // Proceed with downloading the file if successful
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Umer_Sohail_CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up
    } catch (error) {
      console.error('Error during CV download:', error);
    }
  };
  
  return (
    <>      
      <Navbar />
      <div className='container offset-lg-1'>
        <div className='row'>
          <div className='col-lg-6 home-main'>
            <TypingEffect
              text={['I\'m a ReactJS Developer', 'NodeJs+ExpressJs', 'BLOCKCHAIN','FOREX TRADER']}
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
            <button onClick={cvdownload} className='cv-download'>MY CV download</button>
          </div>
          <div className="col-lg-4 offset-lg-2">
            <img
              className="home-img-one"
              src="https://media.licdn.com/dms/image/v2/D5603AQHNxqJ-f0xuuQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726896992279?e=1732147200&v=beta&t=4GurKMpZVPW3s-1I5A96GMwTSLJ6PJJf709QbuNgqh4"
              alt="Profile"
            />
            <div>
              <ul className='home-first-ul'>
                <li>
                  <Link className='home-first-link' to="https://www.youtube.com/@TRADEANDCODE-uw9hx">
                    <i className="fa fa-youtube-play home-first-i"></i>
                  </Link>
                </li>
                <li>
                  <Link className='home-first-link' to="/">
                    <i className="fa fa-twitter home-first-i"></i>
                  </Link>
                </li>
                <li>
                  <Link className='home-first-link' to="https://www.linkedin.com/in/m-umer-sohail-007848289/">
                    <i className="fa fa-linkedin-square home-first-i"></i>
                  </Link>
                </li>
                <li>
                  <Link className='home-first-link' to="https://github.com/mianomersohail">
                    <i className="fa fa-github home-first-i"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WorkExperience />
      <FillingEffect/>
      <CountEffect/>
      <Courses />
      <EthSection/>
      <Trusted />
      <Footer />
    </>
  );
}
