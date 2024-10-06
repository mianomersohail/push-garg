export default function TradingList({assetname,assetimgsrc}){
    return(
        <>
        <div className='col-lg-3 signal-top offset-lg-1 signal-box'>
                        <div><label className=' signal-label-bold'>{assetname} </label><img className='signal-img' src={assetimgsrc} /></div>
                        <div><label>Buying Price</label></div>
                        <div><input placeholder='Enter Buying Price for btc' /></div>
                        <div><label>Stop Loss Price</label></div>
                        <div><input placeholder='Enter Stop Loss Price for btc' /></div>
                        <div><label>Take Profit</label></div>
                        <div><input placeholder='Enter TakeProfit Price for btc' /></div>
                        <div><label>Discriptions:</label></div>
                        <div><textarea placeholder='Your Sugestions' cols="23" rows="">
                        </textarea></div>
                        <div><button className='paid-btn-one'>Post</button></div>
                    </div>
        </>
    )
}
