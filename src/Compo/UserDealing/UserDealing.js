import React, { useState } from "react";
import PaidUser from "../PaidUser/PaidUser";
import './UserDealing.css';

export default function UserDealing() {
    const [balance, setBalance] = useState('');
    const [deals, setDeals] = useState('');
    const [DealAmount, SetDealAmount] = useState('')
    const [DealAddress1, SetDealAddress1] = useState('')
    const [DealAddress2, SetDealAddress2] = useState('')
    const [id,setid]=useState('')

    const UpdateDealAddress1 = (event) => {
        SetDealAddress1(event.target.value)

    }
    const UpdateDealAddress2 = (event) => {
        SetDealAddress2(event.target.value)

    }
    const UpdateDealAmount = (event) => {
        SetDealAmount(event.target.value)

    }
    const [showNewDealInputs, setShowNewDealInputs] = useState(false);
    const newdeal = async (event) => {
        event.preventDefault();
        const Data = {
         DealAmount,
         DealAddress1,
             DealAddress2
        }
        try {
            const response = await fetch('http://localhost:3001/NewDeal', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify( Data )
            })
            if (!response) {
                alert("No Response from server")
            }
            const Result = await response.json()
            if(!Result){
                alert('Deal Not Add PlZ Try Again');
            }
            if(Result){
                console.log(Result)
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    const checkid=async()=>{
        try{
        const response=await fetch('http://localhost:3001/DEALS',{
            method:"GET",
            headers:{"Content-Type":'application/json'
            }   
        }
        )
        if(!response){
            alert('SERVER NOT RESPONSE')

        }
        const Result=await response.text();
        console.log(Result)
       if(Result){
        setid(Result)
       }
       if(!Result){
        alert("ERROR PLZ TRY AGAIN")
       }
       
    }catch(error){
        alert(error.message)
        console.log(error)
    }

    }
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
            <div className="container  offset-lg-1">
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
                    <div className="col-lg-7 Deal-Main">
                        <div> 
                            <div className="Dealing-div Deal-blue">Deal Status</div>
                            <p>{deals}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 Deal-Main"> 
                        <div className="Deal-Input">
                            <div className="Dealing-div Deal-Main Deal-blue Deal-left">Lock Amount</div>
                            <div><input placeholder="Enter Your Address"/></div>
                        </div>
                    </div>
                    <div className="col-lg-6 Deal-Main">
                        <div className="Deal-Input">
                            <div className="Dealing-div Deal-blue Deal-Main  ">DEAL STATUS</div>
                            <div><input placeholder="Enter Your Deal Id" /></div>
                        </div>
                    </div>
                    <div className="col-lg-12 Deal-Main">
                        <div className="Deal-Input" style={{ position: 'relative' }}>
                            <div onClick={handleNewDealClick} className="Dealing-div Deal-Orange">New Deal</div>
                            <div className={`new-deal-inputs ${showNewDealInputs ? 'open' : ''}`}>
                                <div><input value={DealAmount} type="Number" name="DealAmount" onChange={UpdateDealAmount} placeholder="Amount" /></div>
                                <div><input value={DealAddress1} name="DealAddress1" onChange={UpdateDealAddress1} placeholder="User1 Address" /></div>
                                <div><input value={DealAddress2} name="DealAddress2" onChange={UpdateDealAddress2} placeholder="User2 Address" /></div>
                                <button onClick={newdeal} className="transact-button">Transact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
