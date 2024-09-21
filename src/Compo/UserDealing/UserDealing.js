import React, { useState } from "react";
import PaidUser from "../PaidUser/PaidUser";
import './UserDealing.css';

export default function UserDealing() {
    const [balance, setBalance] = useState('');
    const [deals, setDeals] = useState('');
    const [showNewDealInputs, setShowNewDealInputs] = useState(false);

    const updateBalance = async () => {
        const response = await fetch('http://localhost:3001/EthBalanceCheck', {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (!response.ok) {
            alert("Server not responding");
            return;
        }

        const result = await response.json();
        const formattedBalance = Number(result).toFixed(18);
        setBalance(`${formattedBalance} ETH`);
    };

    const handleNewDealClick = () => {
        setShowNewDealInputs(prev => !prev);
    };

    return (
        <>
            <PaidUser />
            <div className="container offset-lg-1">
                <div className="row">
                    <p>Balance:</p>
                    <div className="col-lg-2">
                        <div>
                            <div onClick={updateBalance} className="Dealing-div Deal-blue">Balance</div>
                            <p>{balance}</p>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div>
                            <div className="Dealing-div Deal-blue">ID</div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div>
                            <div className="Dealing-div Deal-blue">Deal Status</div>
                            <p>{deals}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="Deal-Input">
                            <div className="Dealing-div Deal-blue">Lock Amount</div>
                            <div><input /></div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="Deal-Input">
                            <div className="Dealing-div Deal-blue">DEAL STATUS</div>
                            <div><input /></div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="Deal-Input" style={{ position: 'relative' }}>
                            <div onClick={handleNewDealClick} className="Dealing-div Deal-Orange">New Deal</div>
                            <div className={`new-deal-inputs ${showNewDealInputs ? 'open' : ''}`}>
                                <div><input placeholder="Input 1" /></div>
                                <div><input placeholder="Input 2" /></div>
                                <div><input placeholder="Input 3" /></div>
                                <button className="transact-button">Transact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
