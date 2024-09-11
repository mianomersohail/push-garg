import './Courses.css'
export default function Courses(){
    return(
        <>
        <div className='container offset-lg-1'>
            <div className='row'>
                <div className='col-12 courses-main'>
                    <h1 style={{fontWeight:'bold'}}>Courses</h1>
                    <p style={{color:"#73737A"}}>Explore a selection of courses designed to help you enhance your skills.</p>
                </div>
                <div className="col-lg-3">
                    <div className="course-box">
                        <img className="course-one-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Fcourses%2Ftwitter-clone.webp&w=1920&q=75"/>
                        <h5 className="course-h5">Full Stack Twitter Clonse</h5>
                        <p className="course-p-one">Create a FullStack Twitter Clone that allows user to crate and upload tweets follows other users,and like, and view their own profiles of others users</p>


                    </div>
                    

                </div>
                <div className="col-lg-3 ">
                    <div className="course-box">
                        <img className="course-one-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Fcourses%2Fdocker.webp&w=1920&q=75"/>
                        <h5 className="course-h5">Docker Mastery Course</h5>
                        <p className="course-p-one">In this Course you will learn everything you need to know about Docker,a powerfull tool for creating deploying,and managing containerized applications</p>


                    </div>
                    

                </div>
                <div className="col-lg-3 ">
                    <div className="course-box">
                        <img className="course-one-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Fcourses%2Fdocker.webp&w=1920&q=75"/>
                        <h5 className="course-h5">Docker Mastery Course</h5>
                        <p className="course-p-one">In this Course you will learn everything you need to know about Docker,a powerfull tool for creating deploying,and managing containerized applications</p>


                    </div>
                    

                </div>
                <div className="col-lg-3 ">
                    <div className="course-box">
                        <img className="course-one-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Fcourses%2Fnext-js.webp&w=1920&q=75"/>
                        <h5 className="course-h5">Next Js 14</h5>
                        <p className="course-p-one">welcome to "Mastering NextJs 14 Course" a comperhensive course design to elevate your skill in developing modern web applications using Next.Js version 14. </p>


                    </div>
                    

                </div>
                
            </div>

        </div>
        
        </>
    )
}