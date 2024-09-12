import './Home.css'
import {Link } from 'react-router-dom'
import Navbar from '../Nav/Nav'
import WorkExperience from '../workexp/workexp'
import Courses from '../courses/Courses'
import Trusted from '../trustedanimation/Trusted'
import Footer from '../Footer/Footer'


export default function Home(){
    return(
        <>
        <Navbar/>
        <div className='container offset-lg-1'>
            <div className='row'>
                <div className='col-lg-6 home-main'>
                    <span>I'm  a</span><span className='home-span-color'>software engineer.</span>
                    <p className='home-p-one'>I’m Muhammad Umer Sohail . Over a 3+ yearsexperience in trading markets,
working in Lahore, I have played an essential role in developing and improving a
wide range of digital products and services across different industries and
business models and Ecommerce platforms where I have found my biggest
passion. Paying close attention to user feedback, spot user behavior patterns,
and iterating from there has always been my motto</p>
                    <p style={{color:"#73737A"}}>~ ChatGPT</p>
                    <p className="home-p-one">Building Teachyst when I'm not working on my day job.</p>
                </div>
                <div className="col-lg-4">
                    <img className="home-img-one" src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs"/>
                    <div>
                        <ul className='home-first-ul'>
                            <li><Link className='home-first-link' to="/"><i class="fa fa-youtube-play  home-first-i"></i></Link></li>
                            <li><Link className='home-first-link' to="/"><i class="fa fa-twitter home-first-i"></i></Link></li>
                            <li><Link className='home-first-link' to="/"><i class="fa fa-linkedin-square home-first-i"></i></Link></li>
                            <li><Link className='home-first-link' to="/"><i class="fa fa-github home-first-i"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <WorkExperience/>
        <Courses/>
        <Trusted/>
        <Footer/>

        
        </>
    )
}