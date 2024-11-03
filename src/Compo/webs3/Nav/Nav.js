import "./Nav.css";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <div className="web3mainnav">
  <img src="https://findtoken.vercel.app/static/media/logo_full.877457fb4a3726310024.png" />
  <ul className="web3ul">
    <Link className="navlink" to="">
      Home
    </Link>
    <Link className="navlink" to="">
      Claim
    </Link>
  </ul>
  <div className="navflexend">
    <button>Connect Wallet <i class='fas fa-wallet' style={{fontSize:' 20px'}}></i>
    </button>

  </div>
</div>

    </>
  );
}
