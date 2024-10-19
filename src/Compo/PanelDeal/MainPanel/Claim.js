import "./Claim.css";
import NavMain from "../DealNav";
export default function Claim() {
  return (
    <>
      <NavMain />
      <div className="container-fluid Claim-main">
        <div className="row">
          <div className="col-lg-12 claim-top">
            <h1 className="claim-center" style={{ color: "white" }}>
              Claim Your Rewards
            </h1>
          </div>
          <div className="claim-center">
            <div className="col-lg-6 ">
              <p className="claim-center" style={{ color: "#3C424A" }}>
                Dividends will be periodically injected into the pool. Your
                dividend share will be based on your $FND token holdings. Check
                socials for more updates!
              </p>
            </div>
          </div>
          <div className="claim-center">
            <div className="col-lg-5 claim-last">
              <span className="">Total ETH Distributed:</span>

              <span className="claim-end claim-font-20">159.24ETH</span>
            </div>
          </div>
          <div className="claim-center">
            <div className="col-lg-5 claim-border">
              <p>~384,967.62 USD</p>
            </div>
          </div>
          <div className="hr">
            <hr className=""></hr>
          </div>
          <div className="claim-center">
            <div className="col-lg-5 claim-last">
              <span className="">Your Total Accured:</span>

              <span className="claim-end claim-font-20">0.9581ETH</span>
            </div>
          </div>
          <div className="claim-center">
            <div className="col-lg-5 claim-border">
              <p>~2210.62 USD</p>
            </div>
          </div>
          <div className="hr">
            <hr className=""></hr>
          </div>
          <div className="claim-center">
            <div className="col-lg-5 claim-last">
              <span className="">Your share:</span>

              <span className="claim-end claim-font-20">159.24ETH</span>
            </div>
          </div>
          <div className="col-lg-12 claim-center claim-top">
            <h5 style={{ color: "white" }}>Your Claimable ETH</h5>
          </div>
          <div className="col-lg-12 claim-center">
            <span style={{ color: "#C07E26" }}>0.9581</span>
            <span>ETH</span>
          </div>
          <div className="col-lg-12 claim-center">~2210.62 USD</div>

          <div className="col-lg-12 claim-center claim-inline-block">
            <button className="claim-btn">Claim</button>

          </div>
        </div>
      </div>
    </>
  );
}
