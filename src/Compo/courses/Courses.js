import './Courses.css'
import { Link } from 'react-router-dom'
import CoursesList from './CoursesList'
const CourseItems = [
  {
    Mainname: "HASSAN VIDEO EDITOR ",
    Mainp: "To create a professional and fully responsive FullStack website for a video editor, you'll use React for the frontend and Node.js with Express for the backend",
    src: "https://www.youtube.com/embed/dZHxa2Lb29E?si=Gib2rFsoFdHI2PiZ",
    toone: "",
    totwo: ""
  },
  {
    MainNav: "PORTFOLIO WEBSITE",
    Mainp: "I built a cutting-edge portfolio website with the latest tools and technologies, following top coding best practices. The site is seamlessly connected to a Node.js",
    src: "https://www.youtube.com/embed/7xYdOsPAPww?si=WqUU0iD9VSLZORnW",
    toone: "https://github.com/mianomersohail/push-garg.git",
    totwo: "https://github.com/mianomersohail/Push-Garg-NodeJS.git"
  },
  {
    MainNav: "UK DOCTOR PROJEC",
    Mainp: "One of my client from the UK entrusted me with a project that started as just an idea no UI,nothing.I transformed their concept into pixelperfect",
    src: "https://www.youtube.com/embed/NAbmDaq7baE?si=zKDdr55xvalaIKhr",
    toone: "",
    totwo: ""
  }
]
export default function Courses() {
  return (
    <>
      <div className='container-fluid  '>
        <div className='row'>
          <div className='col-10 offset-lg-2 courses-main '>
            <h1 style={{ fontWeight: 'bold' }}>Projects</h1>
            <p style={{ color: "#73737A" }}>Explore a selection of Projects designed to help you to check my skills.</p>
          </div>
          {/* Full Stack Hassan Video Editor */}
          <div className='Courses'>
            {CourseItems.map((item, index) => (
              <CoursesList key={index} MainName={item.MainNav} Mainp={item.Mainp} src={item.src} toone={item.toone} twpto={item.totwo} />
            ))}
          </div>
        </div>
      </div>

    </>
  )
}
