import './FrontEndSignal.css';
import PaidUser from '../PaidUser/PaidUser';
import FrontEndSignalList from './FrontEndList';
import BitcoinPrice from '../BitcoinPrice/Bitcoinprice';
import { useEffect, useState } from 'react';
import useApi from '../FetchHook/FetchPost';

export default function FrontEndSignal() {
    const { loading, error, post } = useApi('http://localhost:3001');
    const [FrontEndData, setFrontEndData] = useState([]); // State to store fetched data

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await post('/FrontEndSignal', {}, headers);
                if (Array.isArray(result)) { // Ensure result is an array
                    setFrontEndData(result);
                    console.log('Fetched Data:', result); // Log the entire result
                } else {
                    console.error("Expected an array but got:", result);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData(); 
    }, []); 

    return (
        <>
            <PaidUser />
            <div className='container offset-lg-0'>
                <div className='row'>
                    <BitcoinPrice />
                    <div className='col-lg-12'>
                        <div className='FrontSignal-latest'>
                            <h1>OUR LATEST SIGNALS</h1>
                        </div>
                    </div>
                    {loading ? ( // Show loading message if data is still being fetched
                        <p>Loading...</p>
                    ) : error ? ( // Show error message if there was an error fetching data
                        <p>Error loading data. Please try again.</p>
                    ) : FrontEndData.length > 0 ? ( // Check if data exists
                        FrontEndData.map((item,index) => {
                            const imageUrl = `http://localhost:3001/${item.image.replace(/\\/g, '/')}`; // Normalize the path
                            console.log(`Item ID: ${item._id}`); // Log ID
                            console.log(`Main Heading: ${item.mainHeading}`); // Log main heading
                            console.log(`Image URL: ${imageUrl}`); // Log constructed image URL
                            console.log(`Main Description: ${item.mainDescription}`); // Log main description
                            return (
                                <FrontEndSignalList 
                                    key={item.index}
                                    imgsrc={imageUrl} // Correctly formatted path
                                    // Use unique ID as key
                                    MainHeading={item.mainHeading} 
                                    Paragraph={item.mainDescription} 
                                />
                            );
                        })
                    ) : (
                        <p>No signals available.</p> // Fallback message if no data
                    )}
                </div>
            </div>
        </>
    );
}
