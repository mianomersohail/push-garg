import './EthSection.css'
export default function EthSection(){
    return(
        <>
        <div className="Container Eth-Main">
            <div className="row">
                <div className="col-lg-12 ethsection-sol">
                    <span className='eth-sec-web'>WEB 3</span><span className='eth-sec-webs'>SOLUTIONS</span>
                </div>
                <div className="col-lg-12 ethsection-sol">
                    <span className='eth-none'>2024 is the Era of Web3 Upgrage Yourself to</span> <span className='eth-blockchain-sec eth-none'>BLOCKCHAIIN</span>
                </div>
                <div className='col-lg-12 eth-block'>
                    <h3 className='eth-sec-custom'>Custom Smart Contract</h3>
                    <p style={{color:'#4077B6'}}>Solidity</p>
                    <h3>Services</h3>
                    <div className='eth-sec-box'>
                        <div>Smart Contract</div><div>Tokens Standars</div><div>Nfts</div>

                    </div>
                    <h3 style={{marginTop:"2rem"}}>Tools</h3>
                    <div className='eth-sec-box'>
                        <div>Hardhat</div><div>Eth.js</div><div>Mocha Chai</div><div>Infura</div>

                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}