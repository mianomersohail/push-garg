import { useState, useRef } from 'react';
import './workexp.css';

export default function WorkExperience() {
    // State to track the selected company
    const [selectedCompany, setSelectedCompany] = useState('');

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
            <div className="container offset-lg-1">
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
                                    <img className="exp-first-img exp-first-img-two" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Flogos%2Fdimension.png&w=32&q=75" alt="Dimension Logo" />
                                    <p className="exp-p-p">Dimension</p>
                                </li>
                                <li
                                    className={`exp-flex ${selectedCompany === 'Emitrr' ? 'active' : ''}`}
                                    onClick={() => handleClick('Emitrr', emitrrRef)}
                                    ref={emitrrRef}
                                >
                                    <img className="exp-first-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Flogos%2Femitrr.jpeg&w=32&q=75" alt="Emitrr Logo" />
                                    <p className="exp-p">Emitrr</p>
                                </li>
                                <li
                                    className={`exp-flex ${selectedCompany === 'Trryst' ? 'active' : ''}`}
                                    onClick={() => handleClick('Trryst', trrystRef)}
                                    ref={trrystRef}
                                >
                                    <img className="exp-first-img" src="https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Flogos%2Ftrryst.webp&w=32&q=75" alt="Trryst Logo" />
                                    <p className="exp-p">TrrYst</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Conditionally render content based on the selected company */}
                    <div className="col-lg-7 offset-lg-1">
                        {selectedCompany === 'Dimension' && (
                            <>
                                <div className='exp-con-span-main'>
                                    <span className=''>Founding Software Engineer</span>
                                    <span className='exp-con-span-two'>@Dimension</span>
                                </div>
                                <p className='exp-p-color'>Apr 2024 - Present</p>
                                <p className='exp-p-color'>Dubai, UAE</p>
                                <p className='exp-p-color'>Building Next-gen developer collaboration tool</p>
                            </>
                        )}
                        {selectedCompany === 'Emitrr' && (
                            <>
                                <div className='exp-con-span-main'>
                                    <span className=''>Software Engineer</span>
                                    <span className='exp-con-span-two'>@Emitrr</span>
                                </div>
                                <p className='exp-p-color'>Mar 2023 - Apr 2024</p>
                                <p className='exp-p-color'>Remote</p>
                                <p className='exp-p-color'>Worked on SMS Automations</p>
                                <p className='exp-p-color'>Worked on Hubspot and Mailchimp integrations</p>
                                <p className='exp-p-color'>Built automated workflows from ground up</p>
                            </>
                        )}
                        {selectedCompany === 'Trryst' && (
                            <>
                                <div className='exp-con-span-main'>
                                    <span className=''>Software Engineer</span>
                                    <span className='exp-con-span-two'>@Trryst</span>
                                </div>
                                <p className='exp-p-color'>Jun 2021 - Mar 20234</p>
                                <p className='exp-p-color'>Remote</p>
                                <p className='exp-p-color'>London, UK</p>
                                <p className='exp-p-color'>Built AI video calling and meeting infrastructure.</p>
                                <p className='exp-p-color'>Worked on cloud file storage infrastructure and smart AI features</p>
                                <p className='exp-p-color'>Built transcriptions and smart meeting actions from ground up</p>
                            </>
                        )}
                    </div> 
                </div>
            </div>
        </>
    );
}
