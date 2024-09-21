import "./Footer.css"
import { Link } from "react-router-dom"
export default function Footer(){
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 footer-box">
                    <img className="footer-img-one" src="https://media.licdn.com/dms/image/v2/D5603AQHNxqJ-f0xuuQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726896992279?e=1732147200&v=beta&t=4GurKMpZVPW3s-1I5A96GMwTSLJ6PJJf709QbuNgqh4"/> <p className="footer-p">Mian Omer</p>

                </div>
                <div className="col-lg-12 footer-box">
                    <ul>
                        <li><Link className="footer-link" to="/">About</Link></li>
                        <li><Link className="footer-link" to="/">Guest Block</Link></li>

                    </ul>

                </div>
                <div className="col-lg-12 footer-box">
                    <ul>
                        <li><Link className="footer-link"> <i class="fa fa-youtube-play  home-first-i"></i> </Link></li>
                        <li><Link className="footer-link"><i class="fa fa-twitter home-first-i"></i></Link></li>
                        <li><Link className="footer-link"><i class="fa fa-linkedin-square home-first-i"></i></Link></li>
                        <li><Link className="footer-link"><i class="fa fa-github home-first-i"></i></Link></li>
                    </ul>

                </div>
            </div>
        </div>
        
        </>
    )
}