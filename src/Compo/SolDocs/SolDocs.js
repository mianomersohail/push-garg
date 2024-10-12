import React, { useState } from 'react';
import './SolDocs.css';
import Navbar from '../Nav/NavList';

const SmartContractDoc = () => {
  const namefromlocal = localStorage.getItem('username')

  const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Dealing {
    // State variables
    mapping(address => uint256) internal Balance;
    mapping(uint256 => Deals) public NewDeals;
    uint256 public nextDealId;
    mapping(address => uint256) public LockAmount;
    
    // Enum for Status Track
    enum Status { Pending, DealAdd, DealClose }

    // Struct for Adding New Deal
    struct Deals {
        uint256 Id;
        uint256 Amount;
        address User1;
        address User2;
        bool User1Agree;
        bool User2Agree;
        bool User1Done;
        bool User2Done;
        Status dealStatus;
    }

    // Functions

    function Withdraw(uint256 Amount) public {
        require(Balance[msg.sender] >= Amount, "Insufficient Balance");
        Balance[msg.sender] -= Amount;
        payable(msg.sender).transfer(Amount);
    }

    function Deposit() public payable {
        require(msg.value > 0);
        Balance[msg.sender] += msg.value;
    }

    receive() external payable {
        require(msg.value > 0, "Invalid Deposit");
        Balance[msg.sender] += msg.value;
    }

    function Balances() public view returns(uint256) {
        return Balance[msg.sender];
    }

    function NewDeal(uint256 _Amount, address _User1, address _User2) public UserNotSame(_User1, _User2) {
        uint256 dealId = nextDealId++;
        NewDeals[dealId] = Deals({
            Id: dealId,
            Amount: _Amount,
            User1: _User1,
            User2: _User2,
            User1Agree: false,
            User2Agree: false,
            User1Done: false,
            User2Done: false,
            dealStatus: Status.Pending
        });
    }

    function User1Agree(uint256 _Id) public BalanceCheck(_Id) OnlyUser1(_Id) OnlyPending(_Id) {
        require(NewDeals[_Id].User1Agree == false, "You Already Agreed");
        NewDeals[_Id].User1Agree = true;
        if (NewDeals[_Id].User1Agree && NewDeals[_Id].User2Agree) {
            NewDeals[_Id].dealStatus = Status.DealAdd;
            Balance[NewDeals[_Id].User1] -= NewDeals[_Id].Amount;
            Balance[NewDeals[_Id].User2] -= NewDeals[_Id].Amount;
            LockAmount[NewDeals[_Id].User1] += NewDeals[_Id].Amount;
            LockAmount[NewDeals[_Id].User2] += NewDeals[_Id].Amount;
        }
    }

    function User2Agree(uint256 _Id) public BalanceCheck(_Id) OnlyUser2(_Id) OnlyPending(_Id) {
        require(NewDeals[_Id].User2Agree == false, "You Already Agreed");
        NewDeals[_Id].User2Agree = true;
        if (NewDeals[_Id].User1Agree && NewDeals[_Id].User2Agree) {
            NewDeals[_Id].dealStatus = Status.DealAdd;
        }
    }

    function User1Satisfy(uint256 _Id) public DealClosed(_Id) OnlyUser1(_Id) {
        require(!NewDeals[_Id].User1Done, "Already Done");
        NewDeals[_Id].User1Done = true;
        if (NewDeals[_Id].User1Done && NewDeals[_Id].User2Done) {
            NewDeals[_Id].dealStatus = Status.DealClose;
            Balance[NewDeals[_Id].User1] += NewDeals[_Id].Amount;
            Balance[NewDeals[_Id].User2] += NewDeals[_Id].Amount;
            LockAmount[NewDeals[_Id].User1] -= NewDeals[_Id].Amount;
            LockAmount[NewDeals[_Id].User2] -= NewDeals[_Id].Amount;
        }
    }

    function User2Satisfy(uint256 _Id) public DealClosed(_Id) OnlyUser2(_Id) {
        require(!NewDeals[_Id].User2Done, "Already Done");
        NewDeals[_Id].User2Done = true;
        if (NewDeals[_Id].User1Done && NewDeals[_Id].User2Done) {
            NewDeals[_Id].dealStatus = Status.DealClose;
            Balance[NewDeals[_Id].User1] += NewDeals[_Id].Amount;
            Balance[NewDeals[_Id].User2] += NewDeals[_Id].Amount;
            LockAmount[NewDeals[_Id].User1] -= NewDeals[_Id].Amount;
            LockAmount[NewDeals[_Id].User2] -= NewDeals[_Id].Amount;
        }
    }
}
  `;

  const [showContract, setShowContract] = useState(false);

  const handleToggle = () => {
    setShowContract(!showContract);
  };

  return (
    <div className="container contract-doc">
      <Navbar imgsrc={'https://c0.wallpaperflare.com/preview/124/110/387/block-blockchain-business-chain.jpg'} showNotifications={!!namefromlocal} // Pass true if username exists
        navlinameone={'Home'} linkone={'/home'} />
      <h1>Smart Contract Documentation</h1>
      <p>This smart contract, named <strong>Dealing</strong>, is designed to manage and facilitate deals between two parties. Here’s a detailed overview:</p>
      <h2>Key Features:</h2>
      <ul>
        <li><strong>Create Deals:</strong> Initiate a new deal between two users with a specified amount.</li>
        <li><strong>User Agreements:</strong> Both users must agree to the terms of the deal before it can proceed.</li>
        <li><strong>Locked Funds:</strong> Funds are locked during the deal and are only released when both parties complete their actions.</li>
        <li><strong>Fund Management:</strong> Users can deposit and withdraw funds to/from the contract.</li>
      </ul>
      <button className="show-contract-btn" onClick={handleToggle}>
        {showContract ? 'Hide Contract Code' : 'Show Contract Code'}
      </button>
      {showContract && (
        <pre className="contract-code">{contractCode}</pre>
      )}
    </div>
  );
};

export default SmartContractDoc;
