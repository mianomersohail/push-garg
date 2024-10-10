import React, { useContext, useState } from "react";
import { Fade, ScaleFade, Slide, SlideFade, Collapse ,useDisclosure,Button,Box} from '@chakra-ui/react'

import useApi from '../FetchHook/FetchPost';
import PaidUser from "../PaidUser/PaidUser";
import './UserDealing.css';
import Footer from '../Footer/Footer'
export default function UserDealing() {
    const { isOpen, onToggle } = useDisclosure()

    const [balance, setBalance] = useState('');
    const [deals, setDeals] = useState('');
    const [DealAmount, SetDealAmount] = useState('');
    const [DealAddress1, SetDealAddress1] = useState('');
    const [DealAddress2, SetDealAddress2] = useState('');
    const [id, setId] = useState('');
    const [showLockInput, setShowLockInput] = useState(false);
    const [showStatusInput, setShowStatusInput] = useState(false);
    const [showNewDealInputs, setShowNewDealInputs] = useState(false);
    const [DealStatusReceive, setDealStatusReceive] = useState({});
    const [StatusValue, setStatusValue] = useState('');
    const [CheckLockamount, setCheckLockamount] = useState('')
    const [AmountReceived, setAmountReceived] = useState('')
    const [User1, SetUsers1] = useState('')
    const [User1id,SetUser1id]=useState()
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
        const conversionRate = 2000;
        return (amount / conversionRate).toFixed(18);
    };
    async function connectMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAddress = accounts[0];
                console.log('User Wallet Address:', userAddress);
                SetMetaMask(userAddress)
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
    const { loading, error, post, data, get } = useApi('http://localhost:3001');
    const newdeal = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const result = await post('/NewDeal', { DealAmount, DealAddress1, DealAddress2 }, headers);
            console.log(result)
            if (result.message == 'DealAdd') {
                alert('Deal Add Successfully')
            }
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    };
    const checkid = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const result = await get('/DEALS', headers);
            console.log(result)
            setId(`ID: ${result.Id}`)
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    };
    const updateBalance = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const result = await post('/EthBalanceCheck', { MetaMask }, headers)
            const Eth = result.tx.toString()
            setBalance(Eth)
            console.log(result)
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    };
    const handleLockInputClick = () => {
        setShowLockInput(prev => !prev);
    };
    const handleStatusInputClick = () => {
        setShowStatusInput(prev => !prev);
    };
    const UserDealStatus = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await post('/Status', { Data: StatusValue }, headers);
            console.log(response)
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
            console.log(error.message);
            alert(error.message)
        }
    };


// const UserDealStatus = async () => {
//     try {
//         const response = await fetch('http://localhost:3001/Status', {
//             method: "POST",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify({ Data: StatusValue })
//         });
//         const Result = await response.text(); // Change to text to handle the incoming string
//         const parsedResult = Result.split(','); // Split the string into an array
//         if (parsedResult.length > 0) {
//             // Update state with structured data
//             setDealStatusReceive({
//                 dealId: parsedResult[0],
//                 amount: parsedResult[1],
//                 user1: parsedResult[2],
//                 user2: parsedResult[3],
//                 user1Agree: parsedResult[4] === 'true',
//                 user2Agree: parsedResult[5] === 'true',
//                 user1Done: parsedResult[6] === 'true',
//                 user2Done: parsedResult[7] === 'true',
//                 currentStatus: parsedResult[8]
//             });
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// };
const checklockamount = async () => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const result = await post('/LockAmount', { Data: MetaMask, CheckLockamount: CheckLockamount }, headers);
        console.log(result);
        setAmountReceived(result.amount); // Ensure you set the specific property
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
};
const UseroneAgree = async () => {
    try {
        const Response = await (fetch('http://localhost:3001/User1Agree', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Data: MetaMask, Id:User1id })
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
          
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}
            {error && <div className="error">Error: {error.message}</div>}
            <div className="container offset-lg-1">
                <div className="row">
                    <div className="col-lg-2">
                    <Button onClick={onToggle} className="paid-btn-one paidwarnbtn" >WARNING</Button>
      <Slide  direction='bottom' in={isOpen}  style={{ zIndex: 10 ,backgroundColor:"#319795",color:"white"}}>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
         <p>Smart contract are immutable any mistake or irregular function may lead to some 
            vulnerbility in the smart contract which may leaid to your extreme lose so plz call function only on the required
            time and for example if you are seller call function sellerreceive after you receive and satisfyseller only if you are
            satisfy from the delivey 
            BEST OF LUCL
         </p>
        </Box>
      </Slide>

                    </div>
                </div>
            </div>
            <div className="container offset-lg-1">
                <div className="row Deal-Main">
               
                    <div className="col-lg-12 Deal-Main">
                        <div>
                            <div onClick={updateBalance} className="Dealing-div Deal-blue">Balance</div>
                            <p>{balance}</p>
                        </div>
                    </div>
                    <div className="col-lg-12 Deal-Main">
                        <div>
                            <div onClick={checkid} className="Dealing-div Deal-blue">ID</div>
                            <p className='ethidcheck'>{id}</p>
                        </div>
                    </div>

                    <div className="col-lg-12 Deal-Main">
                        <div className="Deal-Input">
                            <p>{AmountReceived}</p>
                            <div onClick={handleLockInputClick} className="Dealing-div Deal-blue Deal-left">Lock Amount</div>
                            <div className={`input-container ${showLockInput ? 'open' : ''}`}>

                                <input className="Deal-m-top" value={CheckLockamount} onChange={AmountUpdate} placeholder="Enter Your Address" />
                                <button className="paid-btn-one " onClick={checklockamount}>Check</button>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 Deal-Main deal-or">
                        <div className="Deal-Input" style={{ position: 'relative' }}>
                            <div onClick={handleNewDealClick} className="Dealing-div Deal-Orange">New Deal</div>
                            <div className={`new-deal-inputs ${showNewDealInputs ? 'open' : ''}`}>
                                <div><input value={DealAmount} type="Number" onChange={UpdateDealAmount} placeholder="Amount (in USD)" /></div>
                                <div><input value={DealAddress1} onChange={UpdateDealAddress1} placeholder="User1 Address" /></div>
                                <div><input value={DealAddress2} onChange={UpdateDealAddress2} placeholder="User2 Address" /></div>
                                <button onClick={newdeal} className="transact-button">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 Deal-Main">
                        <div className="Deal-Input">
                            <div onClick={handleStatusInputClick} className="Dealing-div Deal-blue Deal-left deal-top">DEAL STATUS</div>
                            <div className={`input-container ${showStatusInput ? 'open' : ''}`}>
                                <input className="Deal-m-top" value={StatusValue} onChange={StatusInputUpdate} placeholder="Enter Your Deal Id" />
                                <button className="paid-btn-one" onClick={UserDealStatus}>Check</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 ">
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
                    <div className="Deal-Input col-lg-12">
                        <div onClick={handleLockInputClick} className="Dealing-div Deal-blue Deal-left">User 1 Agree</div>
                        <div className={`input-container ${showLockInput ? 'open' : ''}`}>
                            <input className="Deal-m-top" value={User1} onChange={SetUser1} placeholder="Enter Your Address" />
                            <button className="paid-btn-one " onClick={UseroneAgree}>Check</button>

                        </div>
                        <input className="Deal-m-top" value={User1id} onChange={(event)=>{SetUser1id(event.target.value)}} placeholder="Enter Your Address" />

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}