import "./NavOver.css";
export default function NavOver() {
  return (
    <>
      <div className="container-fluid">
  <div className="row navover-main">
    <div className="col-lg-1 col-md-2 col-sm-6 col-6 navover-box">
      <p>Pair</p>
      <h4>FND.ETH</h4>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-6 col-6 navover-box navover-flexend">
      <p className="market-price-nav">Market Price/Token</p>
      <div className="flex-navover">
        
        <span style={{fontWeight: "bold"}}>0</span><span>.0</span><span><sub>6</sub></span><span>16</span> <span>ETH</span>
        </div>
    </div>
    <div className="col-lg-1 col-md-2 col-sm-3 col-3 navover-box navover-box-top">
      <p className="navover-small">Transfer tax</p>
      <span style={{fontWeight: "bold", fontSize: "18px"}}>0%</span>
    </div>
    <div className="col-lg-1 col-md-2 col-sm-3 col-3 navover-box navover-box-top">
      <p className="navover-small">ETH Price</p>
      <p>$ <span style={{fontWeight: "bold", fontSize: "18px"}}>0</span>. 00</p>
    </div>
    <div className="col-lg-1 col-md-2 col-sm-3 col-3 navover-box navover-box-top">
      <p className="navover-small">All Orders</p>
      <span style={{fontWeight: "bold", fontSize: "18px"}}>2</span>
    </div>
    <div className="col-lg-1 col-md-2 col-sm-3 col-3 navover-box navover-box-top">
      <p className="navover-small ">FND Price</p>
      <p className="">$ <span style={{fontWeight: "bold", fontSize: "18px"}}>0</span>. 00</p>
    </div>
  </div>
</div>

    </>
  );
}
