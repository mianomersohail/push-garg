import React, { useContext, useState } from "react";
import PaidUser from "../PaidUser/PaidUser";
import './UserDealing.css';
export default function UserDealing() {
    const [balance, setBalance] = useState('');
    const [deals, setDeals] = useState('');
    const [DealAmount, SetDealAmount] = useState('');
    const [DealAddress1, SetDealAddress1] = useState('');
    const [DealAddress2, SetDealAddress2] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLockInput, setShowLockInput] = useState(false);
    const [showStatusInput, setShowStatusInput] = useState(false);
    const [showNewDealInputs, setShowNewDealInputs] = useState(false);
    const [DealStatusReceive, setDealStatusReceive] = useState({});
    const [StatusValue, setStatusValue] = useState('');
    const [CheckLockamount, setCheckLockamount] = useState('')
    const [AmountReceived, setAmountReceived] = useState('')
    const [User1, SetUsers1] = useState('')
    const [MetaMask, SetMetaMask] = useState('')
    const handleNewDealClick = () => {
        setShowNewDealInputs(prev => !prev);
    };
    const AmountUpdate = (event) => {
        setCheckLockamount(event.target.value)
    }
    const UpdateDealAddress1 = (event) => {
        SetDealAddress1(event.target.value);
    };

    const UpdateDealAddress2 = (event) => {
        SetDealAddress2(event.target.value);
    };

    const UpdateDealAmount = (event) => {
        SetDealAmount(event.target.value);
    };

    const StatusInputUpdate = (event) => {
        setStatusValue(event.target.value);
    };
    const SetUser1 = (event) => {
        SetUsers1(event.target.value)


    }
    const convertToEthers = (amount) => {
        const conversionRate = 2000; // Example conversion rate: 1 ETH = 2000 USD
        return (amount / conversionRate).toFixed(18); // Convert and format to 18 decimal places
    };

   
    async function connectMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAddress = accounts[0]; // Get the first account (user's wallet address)

                console.log('User Wallet Address:', userAddress);
                SetMetaMask(userAddress)

                // Send userAddress to the backend
                const response = await fetch('/api/user-agree', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Data: userAddress })
                });

                const responseData = await response.json();
                console.log('Response from server:', responseData);

            } catch (error) {
                console.error('MetaMask Error:', error);
            }
        } else {
            alert('MetaMask is not installed');
        }
    }

    connectMetaMask();

    const newdeal = async (event) => {
        event.preventDefault();
        // const convertedAmount = convertToEthers(DealAmount); // Convert DealAmount to ethers 
        const Data = {
            DealAmount,
            DealAddress1,
            DealAddress2
        };
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/NewDeal', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(Data)
            });

            const Result = await response.json();
            setLoading(false);
            if (Result) {
                alert('Deal Added Successfully. Check Console for transaction hash');
                console.log(Result);
            }
            if (Result.errormessage) {
                alert(Result.errormessage);
            }


        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };

    const checkid = async () => {
        try {
            const response = await fetch('http://localhost:3001/DEALS', {
                method: "GET",
                headers: { "Content-Type": 'application/json' }
            });

            const Result = await response.text();
            console.log(Result);

            if (Result) {
                setId(Result);
            } else {
                alert("ERROR. PLEASE TRY AGAIN");
            }
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const updateBalance = async () => {
        try {
            const response = await fetch('http://localhost:3001/EthBalanceCheck', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(MetaMask)
            });

            const result = await response.json();
            const formattedBalance = Number(result).toFixed(18);
            setBalance(`${formattedBalance} ETH`);
        } catch (error) {
            alert("Server not responding");
        }
    };

    const handleLockInputClick = () => {
        setShowLockInput(prev => !prev);
    };

    const handleStatusInputClick = () => {
        setShowStatusInput(prev => !prev);
    };

    const UserDealStatus = async () => {
        try {
            const response = await fetch('http://localhost:3001/Status', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ Data: StatusValue })
            });

            const Result = await response.text(); // Change to text to handle the incoming string
            const parsedResult = Result.split(','); // Split the string into an array
            if (parsedResult.length > 0) {
                // Update state with structured data
                setDealStatusReceive({
                    dealId: parsedResult[0],
                    amount: parsedResult[1],
                    user1: parsedResult[2],
                    user2: parsedResult[3],
                    user1Agree: parsedResult[4] === 'true',
                    user2Agree: parsedResult[5] === 'true',
                    user1Done: parsedResult[6] === 'true',
                    user2Done: parsedResult[7] === 'true',
                    currentStatus: parsedResult[8]
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };
    const checklockamount = async () => {
        try {
            const response = await fetch('http://localhost:3001/LockAmount', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ Data: MetaMask })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Amount received from backend:", result.amount); // Log the amount

            // Check if result.amount is valid before proceeding
            if (!result.amount || result.amount === '0' || isNaN(result.amount)) {
                throw new Error("Invalid or zero amount received from backend");
            }

            const amountInEthers = convertToEthers(result.amount); // Convert to ethers
            setAmountReceived(amountInEthers); // Update state with the converted amount
            console.log("Converted amount in ethers:", amountInEthers);

        } catch (error) {
            alert("Error: " + error.message);
            console.log(error);
        }
    };

    const UseroneAgree = async () => {
        try {
            const Response = await (fetch('http://localhost:3001/User1Agree', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Data: User1, Datas: MetaMask })
            }))
            if (!Response) {
                throw new Error(`HTTP error! Status: ${Response.status}`);
            }
            const result = await Response.json()
            console.log(result)
            alert(result.errormessage)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <PaidUser />
            <div className="container offset-lg-1">
                <div className="row Deal-Main">
                    <div className="col-lg-2 Deal-Main">
                        <div>
                            <div onClick={updateBalance} className="Dealing-div Deal-blue">Balance</div>
                            <p>{balance}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 Deal-Main">
                        <div>
                            <div onClick={checkid} className="Dealing-div Deal-blue">ID</div>
                            <p>{id}</p>
                        </div>
                    </div>
                    <div className="col-lg-3 Deal-Main">
                        <div>
                            <div className="Dealing-div Deal-blue">Deal Status</div>
                            <p>{deals}</p>
                        </div>
                    </div>
                    <div className="col-lg-3 Deal-Main">
                        <div className="Deal-Input">
                            <p>{AmountReceived}</p>
                            <div onClick={handleLockInputClick} className="Dealing-div Deal-blue Deal-left">Lock Amount</div>
                            <div className={`input-container ${showLockInput ? 'open' : ''}`}>

                                <input className="Deal-m-top" value={CheckLockamount} onChange={AmountUpdate} placeholder="Enter Your Address" />
                                <button className="paid-btn-one " onClick={checklockamount}>Check</button>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 Deal-Main">
                        <div className="Deal-Input">
                            <div onClick={handleStatusInputClick} className="Dealing-div Deal-blue Deal-left deal-top">DEAL STATUS</div>
                            <div className={`input-container ${showStatusInput ? 'open' : ''}`}>
                                <input className="Deal-m-top" value={StatusValue} onChange={StatusInputUpdate} placeholder="Enter Your Deal Id" />
                                <button className="paid-btn-one" onClick={UserDealStatus}>Check</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-2 ">
                        <div className="Deal-status-receive">
                            <h5>DEAL ID: {DealStatusReceive.dealId}</h5>
                            <h5>DEAL Amount: {DealStatusReceive.amount} eth</h5>
                            <h5>DEAL User1: {DealStatusReceive.user1}</h5>
                            <h5>DEAL User2: {DealStatusReceive.user2}</h5>
                            <h5>User1 Agree: {DealStatusReceive.user1Agree ? 'Yes' : 'No'}</h5>
                            <h5>User2 Agree: {DealStatusReceive.user2Agree ? 'Yes' : 'No'}</h5>
                            <h5>User1 Done: {DealStatusReceive.user1Done ? 'Yes' : 'No'}</h5>
                            <h5>User2 Done: {DealStatusReceive.user2Done ? 'Yes' : 'No'}</h5>
                            <h5>Current Status: {DealStatusReceive.currentStatus}</h5>
                        </div>
                    </div>
                    <div className="Deal-Input col-lg-6">

                        <div onClick={handleLockInputClick} className="Dealing-div Deal-blue Deal-left">User 1 Agree</div>
                        <div className={`input-container ${showLockInput ? 'open' : ''}`}>

                            <input className="Deal-m-top" value={User1} onChange={SetUser1} placeholder="Enter Your Address" />
                            <button className="paid-btn-one " onClick={UseroneAgree}>Check</button>

                        </div>
                    </div>
                    <div className="col-lg-8 Deal-Main deal-or">
                        <div className="Deal-Input" style={{ position: 'relative' }}>
                            <div onClick={handleNewDealClick} className="Dealing-div Deal-Orange">New Deal</div>
                            <div className={`new-deal-inputs ${showNewDealInputs ? 'open' : ''}`}>
                                <div><input value={DealAmount} type="Number" onChange={UpdateDealAmount} placeholder="Amount (in USD)" /></div>
                                <div><input value={DealAddress1} onChange={UpdateDealAddress1} placeholder="User1 Address" /></div>
                                <div><input value={DealAddress2} onChange={UpdateDealAddress2} placeholder="User2 Address" /></div>
                                <button onClick={newdeal} className="transact-button">
                                    {loading ? 'Processing...' : 'Transact'}
                                </button>
                                {loading && <div className="spinner">Loading...</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
