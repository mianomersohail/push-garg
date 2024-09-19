import './Courses.css'
import {Link} from 'react-router-dom'
export default function Courses(){
    return(
        <>
        <div className='container'>
            <div className='row'>
                <div className='col-11 courses-main '>
                    <h1 style={{fontWeight:'bold'}}>Projects</h1>
                    <p style={{color:"#73737A"}}>Explore a selection of Projects designed to help you to check my skills.</p>
                </div>
                {/* Full Stack Hassan Video Editor */}
                <div className="col-lg-3">
                    <div className="course-box">
                        <iframe 
                          className="course-one-img" 
                          src="https://www.youtube.com/embed/dZHxa2Lb29E?si=fgFMwxegdMgi39Pf" 
                          title="Full Stack Hassan Video Editor"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                        <h5 className="course-h5">Full Stack Hassan Video Editor</h5>
                        <p className="course-p-one">To create a professional and fully responsive FullStack website for a video editor, you'll use React for the frontend and Node.js with Express for the backend.</p>
                        <button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <Link className='course-link' to="">
  Github Source Code React
</Link>
</button>
<button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <Link className='course-link'  to="https://github.com/mianomersohail/Push-Garg-NodeJS.git">
  Github Source Code Node
  </Link>
</button>
                    </div>
                </div>
                {/* Docker Mastery Course */}
                <div className="col-lg-3">
                    <div className="course-box">
                        <iframe 
                          className="course-one-img" 
                          src="https://www.youtube.com/embed/7xYdOsPAPww?si=WqUU0iD9VSLZORnW" 
                          title="Docker Mastery Course"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                        <h5 className="course-h5">PORTFOLIO WEBSITE</h5>
                        <p className="course-p-one">"I built a cutting-edge portfolio website with the latest tools and technologies, following top coding best practices. The site is seamlessly connected to a Node.js backend."
.</p>
<button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <Link className='course-link'  to="https://github.com/mianomersohail/push-garg.git">
  Github Source Code React
  </Link>
</button>
<button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <Link className='course-link'  to="https://github.com/mianomersohail/Push-Garg-NodeJS.git">
  Github Source Code Node
  </Link>
</button>

                    </div>
                </div>
                {/* Repeat for other courses */}
                <div className="col-lg-3">
                    <div className="course-box">
                        <iframe 
                          className="course-one-img" 
                          src="https://www.youtube.com/embed/NAbmDaq7baE?si=zKDdr55xvalaIKhr" 
                          title="Another Course"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                        <h5 className="course-h5">UK DOCTOR PROJECT</h5>
                        <p className="course-p-one">"One of my regular clients from the UK on Fiverr entrusted me with a project that started as just an idea — no UI, nothing. I transformed their concept into a flawless, pixel-perfect design.</p>
                        <button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <Link className='course-link' to="">
  
  Github Source Code React
  </Link>
</button>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="course-box">
                        <iframe 
                          className="course-one-img" 
                          src="https://www.youtube.com/embed/12UP_HefB0U?si=5Esnxe0jQIAEbsH2" 
                          title="Next Js 14"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                        <h5 className="course-h5">MY PORTFOLIO </h5>
                        <p className="course-p-one">I've developed a dynamic website designed for seamless interaction, where you can easily explore and purchase my premium trading market and MERN stack courses.</p>
                        <button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg><Link className='course-link' to=''>
  Github Source Code React
  </Link>
</button>
<button className="courses-github-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <Link className='course-link'  to="https://github.com/mianomersohail/Push-Garg-NodeJS.git">
  Github Source Code Node
  </Link>
</button>
                    </div>
                </div>
                <div className="col-lg-3 offset-lg-4 course-box-animation ">
                <div className="course-box ">
                        <iframe 
                          className="course-one-img" id='course-main-video' 
                          src="https://www.youtube.com/embed/sH5GTQxEa-k?si=1InwAK3wFkbQ8531" 
                          title="Next Js 14"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                        <h5 className="course-h5">PORTFOLIO SHOWCASE</h5>
                        <p className="course-p-one">As a dedicated MERN stack web developer with a strong foundation in full-stack development, I specialize in creating dynamic, user-centric web applications. My expertise spans both front-end and back-end technologies, ensuring seamless and responsive user experiences..</p>
                        
                    </div>

        </div>
            </div>
        </div>
        
        </>
    )
}
