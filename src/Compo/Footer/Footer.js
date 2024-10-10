import "./Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="footer-container ">
        <div className=" footer-row">
          <div className="col-lg-12  footer-box">
            <img
              className="footer-img"
              src="https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727442009142?e=1732752000&v=beta&t=02QmQeS0WM_hDBtm39AduhoW4cZFru3e4d-4CQeqsdc"
              alt="Profile"
            />
            <p className="footer-title">Mian Omer</p>
          </div>
          <div className="col-lg-12 footer-box">
            <ul className="footer-social-list">
              <li><Link className="footer-social-link" to="/">About</Link></li>
              <li><Link className="footer-social-link" to="/">Guest Block</Link></li>
            </ul>
          </div>
          <div className="col-lg-12 footer-box">
            <ul className="footer-social-list">
              <li><Link className="footer-social-link"><i className="fa fa-youtube-play footer-icon"></i></Link></li>
              <li><Link className="footer-social-link"><i className="fa fa-twitter footer-icon"></i></Link></li>
              <li><Link className="footer-social-link"><i className="fa fa-linkedin-square footer-icon"></i></Link></li>
              <li><Link className="footer-social-link"><i className="fa fa-github footer-icon"></i></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
