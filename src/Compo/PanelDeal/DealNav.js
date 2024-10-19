import './DealNav.css'
import {Link} from 'react-router-dom'
export default function DealNav(){
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 Deal-nav-main">
                    <div className="DealNaving-img">
                        <img src="data:image/png;base64,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"/>
                    </div>
                    <ul className='DealingNaving-ul'>
                        <Link to="/Panel Deal" className='dealnav-li'>Home</Link>
                        <Link className='dealnav-li' to="/Claim Reward">Claim</Link>
                    </ul>
                    <div className='navwallet-btn'>
                        <span>Connect Wallet</span>
                        <span>
                            <i className='fas fa-wallet' style={{fontSize:'16px'}}></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
