import React, { useState } from 'react';
import axios from 'axios';
import AdminPanel from '../AdminPanel/AdminPanel'
import './TradingSignalAdmin.css'
import useApi from '../FetchHook/FetchPost'
export default function TradingList({ assetname, assetimgsrc }) {
    const [file, setFile] = useState();
    const [MainHeading,setmainheading]=useState(null)
    const [MainDiscription,setmaindiscription]=useState(null)


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const { loading, error, data, post } = useApi('http://localhost:3001');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const formData = new FormData();
        formData.append('maindiscription', MainDiscription);
        formData.append('mainheading', MainHeading);
            formData.append('image', file);
    

        try {
            const result = await post('/TradeSignal', formData, headers);
            console.log(result)
    }catch(error){

    }
}
    

    return (
        <>
        <AdminPanel/>
        {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}
            {error && <div className="error">Error: {error.message}</div>}
            <div className="container offset-lg-1">
                <div className="row">
                    <div className="col-lg-6 AdminSignalbox">
                        <form onSubmit={handleSubmit}>

                            <h3>Upload an asset image  {assetname}</h3>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                required 
                            />
                            <h3>Asset Main Information</h3>
                            <input value={MainHeading} onChange={(event)=>{setmainheading(event.target.value)}} placeholder='Enter Main Info'/>
                            <h3>Signals Detail</h3>
                            <input value={MainDiscription} onChange={(event)=>{setmaindiscription(event.target.value)}} placeholder='Enter Signal Details'/>
                            <button  className='paid-btn-one' type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
