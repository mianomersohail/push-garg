import { useNavigate } from 'react-router-dom'
import AdminPanel from '../AdminPanel/AdminPanel'
import './TradingSignalAdmin.css'
import TradingList from './TradingList'
import TradingData from '../TradingSignalAdmin/TradingSignalStaticData'
export default function TradingSignalAdmin() {
    return (
        <>
            <AdminPanel />
            <div className='container '>
                <div className='row signal-main'>
                {TradingData.map((item, index) => (
                  <TradingList key={index} assetname={item.assetname}  assetimgsrc={item.assetimgsrc}  />
                ))}
                </div>
            </div>
        </>
    )
}
