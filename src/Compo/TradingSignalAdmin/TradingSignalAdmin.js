import AdminPanel from '../AdminPanel/AdminPanel'
import './TradingSignalAdmin.css'
export default function TradingSignalAdmin(){
    return(
        <>
        <AdminPanel/>
        <div className='container '>
            <div className='row signal-main'>
                <div className='col-lg-3 offset-lg-1 signal-box'>
                    <div><label className='signal-label-bold'>Bitcoin </label><img className='signal-img' src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"/></div>
                    <div><label>Buying Price</label></div>
                    <div><input placeholder='Enter Buying Price for btc'/></div>
                    <div><label>Stop Loss Price</label></div>
                    <div><input placeholder='Enter Stop Loss Price for btc'/></div>
                    <div><label>Take Profit</label></div>
                    <div><input placeholder='Enter TakeProfit Price for btc'/></div>
                    <div><label>Discriptions:</label></div>
                    <div><textarea placeholder='Your Sugestions
' cols="23" rows="">

                        </textarea></div>
                    <div><button className='paid-btn-one'>Post</button></div>

                </div>
                <div className='col-lg-3 signal-top signal-box'>
                    <div><label className='signal-label-bold'>Gold </label><img className='signal-img' src="https://s3-symbol-logo.tradingview.com/metal/gold--big.svg"/></div>
                    <div><label>Buying Price</label></div>
                    <div><input placeholder='Enter Buying Price for btc'/></div>
                    <div><label>Stop Loss Price</label></div>
                    <div><input placeholder='Enter Stop Loss Price for btc'/></div>
                    <div><label>Take Profit</label></div>
                    <div><input placeholder='Enter TakeProfit Price for btc'/></div>
                    <div><label>Discriptions:</label></div>
                    <div><textarea placeholder='Your Sugestions
' cols="23" rows="">

                        </textarea></div>
                    <div><button className='paid-btn-one'>Post</button></div>

                </div>
                <div className='col-lg-3 signal-top signal-box'>
                    <div><label className='signal-label-bold'>Crude Oil </label><img className='signal-img' src="https://s3-symbol-logo.tradingview.com/crude-oil--big.svg"></img></div>
                    <div><label>Buying Price</label></div>
                    <div><input placeholder='Enter Buying Price for btc'/></div>
                    <div><label>Stop Loss Price</label></div>
                    <div><input placeholder='Enter Stop Loss Price for btc'/></div>
                    <div><label>Take Profit</label></div>
                    <div><input placeholder='Enter TakeProfit Price for btc'/></div>
                    <div><label>Discriptions:</label></div>
                    <div><textarea placeholder='Your Sugestions
' cols="23" rows="">

                        </textarea></div>
                    <div><button className='paid-btn-one'>Post</button></div>

                </div>
                <div className='col-lg-3 signal-top  offset-lg-1 signal-box'>
                    <div><label className='signal-label-bold'>Dollar </label><img className='signal-img' src="https://s3-symbol-logo.tradingview.com/indices/u-s-dollar-index--big.svg"></img></div>
                    <div><label>Buying Price</label></div>
                    <div><input placeholder='Enter Buying Price for btc'/></div>
                    <div><label>Stop Loss Price</label></div>
                    <div><input placeholder='Enter Stop Loss Price for btc'/></div>
                    <div><label>Take Profit</label></div>
                    <div><input placeholder='Enter TakeProfit Price for btc'/></div>
                    <div><label>Discriptions:</label></div>
                    <div><textarea placeholder='Your Sugestions
' cols="23" rows="">

                        </textarea></div>
                    <div><button className='paid-btn-one'>Post</button></div>

                </div>
                <div className='col-lg-3 signal-top signal-box'>
                    <div><label className='signal-label-bold'>Euro </label><img className='signal-img' src="https://s3-symbol-logo.tradingview.com/country/EU--big.svg"></img></div>
                    <div><label>Buying Price</label></div>
                    <div><input placeholder='Enter Buying Price for btc'/></div>
                    <div><label>Stop Loss Price</label></div>
                    <div><input placeholder='Enter Stop Loss Price for btc'/></div>
                    <div><label>Take Profit</label></div>
                    <div><input placeholder='Enter TakeProfit Price for btc'/></div>
                    <div><label>Discriptions:</label></div>
                    <div><textarea placeholder='Your Sugestions
' cols="23" rows="">

                        </textarea></div>
                    <div><button className='paid-btn-one'>Post</button></div>

                </div>
                <div className='col-lg-3 signal-top signal-box'>
                    <div><label className='signal-label-bold'>Aud/Usd </label><img src="https://s3-symbol-logo.tradingview.com/country/AU--big.svg" className='signal-img'></img></div>
                    <div><label>Buying Price</label></div>
                    <div><input placeholder='Enter Buying Price for btc'/></div>
                    <div><label>Stop Loss Price</label></div>
                    <div><input placeholder='Enter Stop Loss Price for btc'/></div>
                    <div><label>Take Profit</label></div>
                    <div><input placeholder='Enter TakeProfit Price for btc'/></div>
                    <div><label>Discriptions:</label></div>
                    <div><textarea placeholder='Your Sugestions
' cols="23" rows="">

                        </textarea></div>
                    <div><button className='paid-btn-one'>Post</button></div>

                </div>
                
            </div>
        </div>
        </>
    )
}