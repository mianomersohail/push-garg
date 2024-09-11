import "./Footer.css"
import { Link } from "react-router-dom"
export default function Footer(){
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 footer-box">
                    <img className="footer-img-one" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Favatar.png&w=64&q=75"/> <p className="footer-p">Mian Omer</p>

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