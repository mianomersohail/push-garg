import './Courses.css'
export default function Courses(){
    return(
        <>
        <div className='container offset-lg-1'>
            <div className='row'>
                <div className='col-12 courses-main'>
                    <h1 style={{fontWeight:'bold'}}>Projects</h1>
                    <p style={{color:"#73737A"}}>Explore a selection of Projects designed to help you enhance my skills.</p>
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
                        <p className="course-p-one">I've developed a dynamic website designed for seamless interaction, where you can easily explore and purchase my premium trading market and MERN stack courses Discount Also Available.</p>
                    </div>
                </div>
                <div className="col-lg-3 offset-lg-4 course-box-animation">
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
