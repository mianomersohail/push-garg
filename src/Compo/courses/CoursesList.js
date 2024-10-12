import { Link } from "react-router-dom"
export default function CoursesList({ Mainname, Mainp, src, toone, twoto }) {
  return (
    <>
      <div className="col-lg-3">
        <div className="course-box">
          <iframe
            className="course-one-img"
            src={src}
            title="Full Stack Hassan Video Editor"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
          <h5 className="course-h5">{Mainname}</h5>
          <p className="course-p-one">{Mainp}</p>
          <button className="courses-github-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <Link className='course-link' to={toone}>
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
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.89-1.15-.89-1.15-.73-.5.05-.49.05-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.87 2.35.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.45.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <Link className='course-link' to={twoto}>
              Github Source Code Node
            </Link>
          </button>
        </div>
      </div>
      {/* Docker Mastery Course */}
    </>
  )
}