import './MainPanelNav.css';

export default function MainPanel() {
    return (
        <>
            <div className='container-fluid' >
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className="Main-Nav-Panel">
                            
                            <ul className='Main-Nav-Panel-ul'>
                                <li>All</li>
                                <li>Open</li>
                                <li>Closed</li>
                                <li>My Offers</li>
                            </ul>
                            <div className="search-bar-container">
                                <input type="text" className="search-bar-input" placeholder="Search..." />
                                <button className="search-bar-btn">
                                    <i className="fas fa-search"></i> {/* Search Icon inside button */}
                                </button>
                                <img className="mainpanel-4boxes" src="https://cdn-icons-png.flaticon.com/128/58/58477.png"/>
                                <i class="fa fa-bars" style={{fontSize:"36px"}}></i>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
