import './FrontEndSignal.css';
import PaidUser from '../PaidUser/PaidUser';
import FrontEndSignalList from './FrontEndList';
import FrontEndData from './FrontSignalStaticData';
import BitcoinPrice from '../BitcoinPrice/Bitcoinprice'
export default function FrontEndSignal() {
    return (
        <>
            <PaidUser />
            <div className='container offset-lg-1'>
                <div className='row'>
                    <BitcoinPrice/>
                    <div className='col-lg-12'>
                        <div className='FrontSignal-latest'><h1 >OUR LATEST SIGNALS</h1></div>

                    </div>
                    {FrontEndData.map((item, index) => (
                        <FrontEndSignalList 
                            key={index} 
                            MainHeading={item.MainHeading} 
                            imgsrc={item.imgsrc} 
                            Paragraph={item.Paragraph} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
