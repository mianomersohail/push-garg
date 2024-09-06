import './Home.css'
import {Link } from 'react-router-dom'
import WorkExperience from '../workexp/workexp'
import Courses from '../courses/Courses'

export default function Home(){
    return(
        <>
        <div className='container offset-lg-1'>
            <div className='row'>
                <div className='col-lg-6 home-main'>
                    <span>Trust me, I'm  a</span><span className='home-span-color'>software engineer.</span>
                    <p className='home-p-one'>Meet Piyush Garg, content creator, educator, and entrepreneur known for his expertise in the tech industry. He has successfully launched numerous technical courses on various platforms. Founder of Teachyst, white-labeled Learning Management System (LMS) to help educators monetize their content globally.</p>
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

        
        </>
    )
}