import React, { useEffect, useRef, useState } from 'react';
import './FillingEffect.css';

export default function FillingEffect() {
    const [visible, setVisible] = useState(false);
    const skillRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setVisible(true); // Trigger effect when visible
                    observer.disconnect(); // Stop observing after effect starts
                }
            },
            { threshold: 0.1 }
        );

        if (skillRef.current) {
            observer.observe(skillRef.current);
        }

        return () => {
            if (skillRef.current) {
                observer.unobserve(skillRef.current);
            }
        };
    }, []);

    return (
        <div className="container Filling-main">
            <div className="row">
                <div className="col-lg-6">
                    <img className='Filling-img'
                        src="https://media.licdn.com/dms/image/v2/D5603AQF1dnwzZXNqeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725296771590?e=1730937600&v=beta&t=8f1l8rnlNTWF40E8YD54NYPk_w9PdDD4PmAlNnRFVhs"
                        alt="Profile"
                    />
                </div>
                <div className="col-lg-6 filling-box-two" ref={skillRef}>
                    <div className="skill">
                        <span className="label">React JS Developer</span>
                        <div className={`progress-bar ${visible ? 'filled' : ''}`} style={{ width: visible ? '80%' : '0%' }}>
                            80%
                        </div>
                    </div>
                    <div className="skill">
                        <span className="label">Node + Express JS</span>
                        <div className={`progress-bar ${visible ? 'filled' : ''}`} style={{ width: visible ? '75%' : '0%' }}>
                            75%
                        </div>
                    </div>
                    <div className="skill">
                        <span className="label">MongoDB</span>
                        <div className={`progress-bar ${visible ? 'filled' : ''}`} style={{ width: visible ? '70%' : '0%' }}>
                            70%
                        </div>
                    </div>
                    <div className="skill">
                        <span className="label">Solidity</span>
                        <div className={`progress-bar ${visible ? 'filled' : ''}`} style={{ width: visible ? '65%' : '0%' }}>
                            65%
                        </div>
                    </div>
                    <div className="skill">
                        <span className="label">Forex Trading</span>
                        <div className={`progress-bar ${visible ? 'filled' : ''}`} style={{ width: visible ? '60%' : '0%' }}>
                            60%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
