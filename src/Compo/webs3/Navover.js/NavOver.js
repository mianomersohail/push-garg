import './NavOver.css'
export default function NavOver(){
    return(
        <>
        <div className='container-fluid'>
            <div className='row dealrow'>
                <div className='col-lg-1 col-6 col-md-2 dealbox first-deal-left'>
                    <p>Pair</p>
                    <h5 className='deal-small'>TDX.ETH</h5>

                </div>
                <div className='col-lg-2 col-6 col-md-2  dealcenter dealleftauto dealbox'>
                    <div>
                    <p>Market Price/Token</p>

                    </div>
                    <span className='dealbold'>0</span><span>.0<sub>6</sub> ETH</span>

                </div>
                <div className='col-lg-1 col-3 col-md-2 dealbox'>
                    <p>Transfer Tax</p>
                    <h3>0%</h3>

                </div>
                <div className='col-lg-1 col-3 col-md-2 dealbox'>
                    <p>ETH Price</p>
                    <span>$</span><span className='dealbold'>0</span><span>.00</span>

                </div>
                <div className='col-lg-1 col-3 col-md-1 dealbox'>
                    <p>All orders</p>
                    <h5 className='dealbold'>2</h5>

                </div>
                <div className='col-lg-1 col-3 col-md-2 dealbox'>
                    <p>TDX Price</p>
                    <span>$</span><span className='dealbold'>0</span><span>.00</span>


                </div>
            </div>
        </div>
        
        </>
    )
}