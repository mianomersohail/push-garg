import React, { useState } from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';
import './TradingSignalAdmin.css';
import useApi from '../FetchHook/FetchPost';
import {io} from 'socket.io-client'
import useCustomToast from '../usetoast/usetoast'; // Import the custom toast hook
import errorsound from '../../audio/error.mp3'
import successsound from '../../audio/success.mp3'
import Footer2 from '../Footer2.js/Footer2'

const userId = localStorage.getItem('userId'); // Or wherever you're storing the user ID
const socket = io('http://localhost:3001', { query: { userId } });

export default function TradingList({ assetname, assetimgsrc }) {
    const [file, setFile] = useState();
    const [MainHeading, setMainHeading] = useState('');
    const [MainDescription, setMainDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { loading, error, data, post } = useApi('http://localhost:3001');
    const { showToast } = useCustomToast(); // Use the custom toast hook

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!MainHeading || !MainDescription || !file) {
            // alert("Please fill in all fields and upload an image.");
            showToast('error', 'Please fill in all fields and upload an image!');

            return;
        }

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const formData = new FormData();
        formData.append('maindiscription', MainDescription);
        formData.append('mainheading', MainHeading);
        formData.append('image', file);
        console.log(formData)
        try {
            const result = await post('/TradeSignal', formData, headers);
            console.log(result);
            setSuccessMessage('Upload successful!'); 
            const succeesaudio=new Audio(successsound)
            succeesaudio.play()
            //send server a notification of successfull uploaded
            socket.emit('SignalUploaded')
            socket.on('NewSignal Uploaded', () => {
                console.log("New signal uploaded successfully");
            });
            // setMainHeading('');
            // setMainDescription('');
            // setFile('');
        } catch (error) {
            const audio = new Audio(errorsound); // Create a new audio object
      audio.play(); // Play the audio
            console.error('Error uploading:', error);
         showToast('eror','Signal Not Uploaded')
        }
    };
    return (
        <>
            <AdminPanel />
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}
            {error && <div className="error">Error: {error.message}</div>}
            <div className="container offset-lg-1">
                <div className="row">
                {successMessage && <h1 className="success" >{successMessage}</h1>} {/* Display success message */}           

                    <div className="col-lg-12 AdminSignalbox">
                        <form onSubmit={handleSubmit}>
                            <h3>Upload an asset image  {assetname}</h3>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                            <h3>Asset Main Information</h3>
                            <input
                                value={MainHeading}
                                onChange={(event) => setMainHeading(event.target.value)}
                                placeholder='Enter Main Info'
                                required
                            />
                            <h3>Signals Detail</h3>
                            <input
                                value={MainDescription}
                                onChange={(event) => setMainDescription(event.target.value)}
                                placeholder='Enter Signal Details'
                                required
                            />
                            <button className='paid-btn-one' type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer2/>
        </>
    );
}
