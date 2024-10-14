import React, { useState } from 'react';
import './SolDocs.css';
import Navbar from '../Nav/NavList';

const SmartContractDoc = () => {
  const namefromlocal = localStorage.getItem('username')

  const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract Dealing {
    mapping(address => uint256) public Balance;
    mapping(uint256 => Deal) public Deals;
    mapping(address => uint256) public LockAmounts;
    uint public CurrentId;
    // Events for debugging
    event LogBalanceUpdate(
        address user,
        uint256 beforeAmount,
        uint256 afterAmount
    );
    event LogDealStatusUpdate(uint dealId, Status newStatus);

    // All modifiers
    modifier OnlySeller(uint _id) {
        require(
            msg.sender == Deals[_id].seller,
            "Only seller of this can Agree"
        );
        _;
    }

    modifier OnlyBuyer(uint _id) {
        require(msg.sender == Deals[_id].buyer, "Only Buyer of this can Agree");
        _;
    }

    enum Status {
        Initial,
        DealAdd,
        SellerAgree,
        BuyerSend,
        SellerSatisfy,
        DealDone
    }

    struct Deal {
        uint id;
        uint dealamount;
        uint latedays;
        uint latefeesperday;
        address buyer;
        address seller;
        Status dealstatus;
    }

    function Withdraw(uint amount) public payable {
        require(Balance[msg.sender] >= amount, "Insufficient Balance");
        Balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
    receive() external payable {
        assert(msg.value > 0);
        Balance[msg.sender] += msg.value;
    }
    function BuyerDealAdd(
          uint256 _dealamount,
              uint _latefees,
        address _seller
    ) public {
        require(
            msg.sender != _seller,
            "Buyer and Seller Address Cannot Be Same"
        );
        Deals[CurrentId] = Deal(
            CurrentId,
            _dealamount,
            0,
            _latefees,
            msg.sender,
            _seller,
            Status.DealAdd
        );
        CurrentId++;
    }

    function sellerAgreewidthdeal(uint _id) public OnlySeller(_id) {
        require(
            Deals[_id].dealstatus == Status.DealAdd,
            "Deal is not Add or Already closed"
        );
        require(
            Balance[Deals[_id].buyer] >= Deals[_id].dealamount &&
                Balance[Deals[_id].seller] >= Deals[_id].dealamount * 2,
            "Buyer balance should be >= dealamount and seller balance should be >= double of the dealamount"
        );

        Deals[_id].dealstatus = Status.SellerAgree;

        uint buyerBalanceBefore = Balance[Deals[_id].buyer];
        uint sellerBalanceBefore = Balance[Deals[_id].seller];

        // Update balances and lock amounts
        Balance[Deals[_id].buyer] -= Deals[_id].dealamount;
        Balance[Deals[_id].seller] -= Deals[_id].dealamount * 2;

        LockAmounts[Deals[_id].buyer] += Deals[_id].dealamount;
        LockAmounts[Deals[_id].seller] += Deals[_id].dealamount * 2;

        uint buyerBalanceAfter = Balance[Deals[_id].buyer];
        uint sellerBalanceAfter = Balance[Deals[_id].seller];

        // Emit events to debug balances
        emit LogBalanceUpdate(
            Deals[_id].buyer,
            buyerBalanceBefore,
            buyerBalanceAfter
        );
        emit LogBalanceUpdate(
            Deals[_id].seller,
            sellerBalanceBefore,
            sellerBalanceAfter
        );

        // Emit event for deal status update
        emit LogDealStatusUpdate(_id, Status.SellerAgree);
    }

    function SellerSend(uint _id) public OnlyBuyer(_id) {
        require(
            Deals[_id].dealstatus == Status.SellerAgree,
            "Seller is not Agree or already closed Deal"
        );
        Deals[_id].dealstatus = Status.BuyerSend;

        // Emit event for deal status update
        emit LogDealStatusUpdate(_id, Status.BuyerSend);
    }

    function SellerReceive(uint _id) public OnlySeller(_id) {
        require(
            Deals[_id].dealstatus == Status.BuyerSend,
            "Buyer Not Send or Deal Already closed"
        );
        Deals[_id].dealstatus = Status.DealDone;

        uint buyerBalanceToUnlock = LockAmounts[Deals[_id].buyer];
        uint sellerBalanceToUnlock = LockAmounts[Deals[_id].seller];
        LockAmounts[Deals[_id].buyer] = 0;
        LockAmounts[Deals[_id].seller] = 0;
        Balance[Deals[_id].buyer] += buyerBalanceToUnlock;
        Balance[Deals[_id].seller] += sellerBalanceToUnlock;
        // Emit event for deal status update
        emit LogDealStatusUpdate(_id, Status.DealDone);
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
