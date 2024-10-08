import { useState, useRef } from 'react';
import './workexp.css';

export default function WorkExperience() {
    // State to track the selected company
    const [selectedCompany, setSelectedCompany] = useState('Dimension');

    // Refs for the list items
    const dimensionRef = useRef(null);
    const emitrrRef = useRef(null);
    const trrystRef = useRef(null);

    // Function to handle scroll to the selected item
    const scrollToItem = (ref) => {
        if (window.innerWidth <= 990 && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Handle list item click
    const handleClick = (company, ref) => {
        setSelectedCompany(company);
        scrollToItem(ref);
    };

    return (
        <>
            <div className="container offset-lg-1 offset-xxl-3 ">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 style={{ fontSize: '30px', fontWeight: 700, fontFamily: "ui-sans-serif, system-ui, -apple-system" }}>
                            Work Experience
                        </h1>
                        <p>I switch a lot of companies. It's mostly about the culture.</p>
                    </div>
                    <div className="col-lg-2 offset-lg-2">
                        <div className="exp-list-container">
                            <ul>
                                <li
                                    className={`exp-flex ${selectedCompany === 'Dimension' ? 'active' : ''}`}
                                    onClick={() => handleClick('Dimension', dimensionRef)}
                                    ref={dimensionRef}
                                >
                                    <img className="exp-first-img " src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Flogos%2Fdimension.png&w=32&q=75" alt="Dimension Logo" />
                                    <p className="exp-p">SoftPyramid</p>
                                </li>
                                <li
                                    className={`exp-flex ${selectedCompany === 'Emitrr' ? 'active' : ''}`}
                                    onClick={() => handleClick('Emitrr', emitrrRef)}
                                    ref={emitrrRef}
                                >
                                    <img className="exp-first-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Flogos%2Femitrr.jpeg&w=32&q=75" alt="Emitrr Logo" />
                                    <p className="exp-p">Upwork</p>
                                </li>
                                <li
                                    className={`exp-flex ${selectedCompany === 'Trryst' ? 'active' : ''}`}
                                    onClick={() => handleClick('Trryst', trrystRef)}
                                    ref={trrystRef}
                                >
                                    <img className="exp-first-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Flogos%2Ftrryst.webp&w=32&q=75" alt="Trryst Logo" />
                                    <p className="exp-p">Moonsys</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Conditionally render content based on the selected company */}
                    <div className="col-lg-7 offset-lg-1">
                        {selectedCompany === 'Dimension' && (
                            <>
                                <div className='exp-con-span-main'>
                                    <span className=''>Soft</span>
                                    <span className='exp-con-span-two'>Pyramid</span>
                                </div>
                                <p className='exp-p-color'>8 Months</p>
                                <p className='exp-p-color'>Office 1120، Al Hafeez Exective، 30 Firdous Mkt Rd Gulberg III, Lahore, Punjab 54000</p>
                                <p className='exp-p-color'>React Js Developer</p>
                            </>
                        )}
                        {selectedCompany === 'Emitrr' && (
                            <>
                                <div className='exp-con-span-main'>
                                    <span className=''>FreeLancing</span>
                                    <span className='exp-con-span-two'>@Fiver</span>
                                </div>
                                <p className='exp-p-color'>2024-Present</p>
                                <p className='exp-p-color'>Remote</p>
                                <p className='exp-p-color'>Front-End Expertise: HTML, CSS, and JavaScript with React js</p>
                                <p className='exp-p-color'>Full-Stack Capability:Skilled in both front-end and back- end
                                development, adept at creatingcohesive, end-to-end web solutions</p>
                                <p className='exp-p-color'>Smart Contracts on Eth BlockChain</p>
                            </>
                        )}
                        {selectedCompany === 'Trryst' && (
                            <>
                                <div className='exp-con-span-main'>
                                    <span className=''>Internship</span>
                                    <span className='exp-con-span-two'>@Moon sys</span>
                                </div>
                                <p className='exp-p-color'>3 Months</p>
                                <p className='exp-p-color'>On Site</p>
                                <p className='exp-p-color'>HCC4+889, Fateh Garh Main Bazar Rd, Fateh Garh Fatehgarh, Lahore, Punjab</p>
                                <p className='exp-p-color'>Collaborated with senior developers to implement responsive user
                                interfaces, ensuring mobile-first design principles</p>
                                <p className='exp-p-color'>Gained hands-on experience in version control with Git and
                                deployment using cloud platforms like Heroku</p>
                                <p className='exp-p-color'></p>
                            </>
                        )}
                    </div> 
                </div>
            </div>
        </>
    );
}
