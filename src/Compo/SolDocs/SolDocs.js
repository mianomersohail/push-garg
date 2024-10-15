import React, { useState } from 'react';
import './SolDocs.css';
import Navbar from '../Nav/NavList';

const SmartContractDoc = () => {
  const namefromlocal = localStorage.getItem('username')

  const contractCode = `
// SPDX-License-Identifier: MIT
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
pragma solidity 0.8.27;
contract Dealing is KeeperCompatibleInterface{
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
        uint parcelsendingdate;
        uint parcelreceivingdate;
        uint parceldeadlinedate;
        Status dealstatus;
    }

    function Withdraw(uint amount)   public payable  {
        require(Balance[msg.sender] >= amount, "Insufficient Balance");
        Balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
    receive() external payable {
        assert(msg.value > 0);
        Balance[msg.sender] += msg.value;
    }
    function Deposit()public payable{
        assert(msg.value>0);
        Balance[msg.sender]+=msg.value;
    }
    function  SellerDealAdd(
          uint256 _dealamount,
              uint _latefees,
        address _Buyer,
        uint _deadlinedate
    ) public {
        require(
            msg.sender != _Buyer,
            "Buyer and Seller Address Cannot Be Same"
        );
        Deals[CurrentId] = Deal(
            CurrentId,
            _dealamount,
            0,
            _latefees,
            _Buyer,
            msg.sender,
            0,
            0,
            _deadlinedate,
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
            Balance[Deals[_id].buyer] >= Deals[_id].dealamount*2 &&
                Balance[Deals[_id].seller] >= Deals[_id].dealamount ,
            "Buyer balance should be >= dealamount and seller balance should be >= double of the dealamount"
        );

        Deals[_id].dealstatus = Status.SellerAgree;
        uint buyerBalanceBefore = Balance[Deals[_id].buyer];
        uint sellerBalanceBefore = Balance[Deals[_id].seller];

        // Update balances and lock amounts
        Balance[Deals[_id].buyer] -= Deals[_id].dealamount*2;
        Balance[Deals[_id].seller] -= Deals[_id].dealamount ;

        LockAmounts[Deals[_id].buyer] += Deals[_id].dealamount * 2;
        LockAmounts[Deals[_id].seller] += Deals[_id].dealamount ;

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
        require(block.timestamp<Deals[_id].parceldeadlinedate,"Your Deadline Pass Now you cannot send ");
        Deals[_id].parcelsendingdate=block.timestamp;
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

        uint buyerBalanceToUnlock = LockAmounts[Deals[_id].buyer]-LockAmounts[Deals[_id].buyer];
        uint sellerBalanceToUnlock = LockAmounts[Deals[_id].seller]+LockAmounts[Deals[_id].seller];
        LockAmounts[Deals[_id].buyer] = 0;
        LockAmounts[Deals[_id].seller] = 0;
        Balance[Deals[_id].buyer] += buyerBalanceToUnlock;
        Balance[Deals[_id].seller] += sellerBalanceToUnlock;
        // Emit event for deal status update
        emit LogDealStatusUpdate(_id, Status.DealDone);
    }
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = false;
        // Check if any deal has passed the parcel deadline date
        for (uint i = 0; i < CurrentId; i++) {
            if (block.timestamp > Deals[i].parceldeadlinedate && Deals[i].dealstatus != Status.DealDone) {
                upkeepNeeded = true;
                break;
            }
        }
    }

    function performUpkeep(bytes calldata) external override {
        // Automatically unlock funds if the deadline has passed
        for (uint i = 0; i < CurrentId; i++) {
            if (block.timestamp > Deals[i].parceldeadlinedate && Deals[i].dealstatus != Status.DealDone) {
                // Unlock the funds
                uint buyerBalanceToUnlock = LockAmounts[Deals[i].buyer];
                uint sellerBalanceToUnlock = LockAmounts[Deals[i].seller];
                
                LockAmounts[Deals[i].buyer] = 0;
                LockAmounts[Deals[i].seller] = 0;
                
                Balance[Deals[i].buyer] += buyerBalanceToUnlock;
                Balance[Deals[i].seller] += sellerBalanceToUnlock;

                Deals[i].dealstatus = Status.DealDone;

                // Emit event for deal status update
                emit LogDealStatusUpdate(i, Status.DealDone);
            }
        }
    }
}

    Test file for this smart contract using Mocha Chai 
    const { ethers } = require("hardhat");
describe("Check Dealing Smart Contract", function () {
  let addr1, addr2, Contract, contract, expect;
  before(async function () {
    const chai = await import("chai");
    expect = chai.expect;
    [addr1, addr2] = await ethers.getSigners();
    console.log(addr1.address, addr2.address);
    Contract = await ethers.getContractFactory("Dealing");
    contract = await Contract.deploy();
    await contract.deployed();
  });
  it("Calling sellerAgreewidthdeal to add new deal and then check the Current Id for update", async function () {
    await contract.BuyerDealAdd(1, 2, addr2.address);
    const id = await contract.CurrentId();
    expect(id.eq(1)).to.be.true;
  });
  it("check the Deal status after deal add by buyer", async function () {
    const dealstatus = await contract.Deals(0);
    const id = dealstatus.id.toNumber();
    const dealamount = dealstatus.dealamount.toNumber();
    const latefees = dealstatus.latefeesperday.toNumber();
    const latedays = dealstatus.latedays.toNumber();
    const buyeraddress = dealstatus.buyer;
    const selleraddress = dealstatus.seller;
    const DealStatus = dealstatus.dealstatus;
    expect(id).to.equal(0);
    expect(dealamount).to.equal(1);
    expect(latefees).to.equal(2);
    expect(latedays).to.equal(0);
    expect(buyeraddress).to.equal(addr1.address);
    expect(selleraddress).to.equal(addr2.address);
    expect(DealStatus).to.equal(1);
  });
  it("Should check the Balance functions to check the status update and any potential vulnerbility",async function(){
      const Address1balance=await contract.Balance(addr1.address)
      console.log(Address1balance)
      //testing for the receive 
      const Address2balance=await contract.Balance(addr2.address)
      const address1=Address1balance.toNumber()
      const Value=await ethers.utils.parseEther('1.0')
      await addr1.sendTransaction({to:contract.address,value:Value})
      const afterdepositbalance=await contract.Balance(addr1.address)
      //Testing for Withdraw

      expect(address1).to.equal(0)
      expect(afterdepositbalance.toString()).to.equal(Value.toString())
      
      await contract.connect(addr1).Withdraw(Value)
      const Baalanceafterwithdraw=await contract.Balance(addr1.address)
      expect(Baalanceafterwithdraw.toString()).to.equal('0')
      //Check for revert from smart contract for withdraw balance which is not available in my smart contract

      const withdrawAmount = ethers.utils.parseEther("1.0"); // Amount to withdraw

    // Check that addr1's initial balance is zero
    const initialBalance = await contract.Balance(addr1.address);
    expect(initialBalance.toString()).to.equal('0');

    // Attempt to withdraw and expect it to revert with "Insufficient Balance"
    await expect(contract.connect(addr1).Withdraw(withdrawAmount)).to.be.revertedWith('Insufficient Balance');


      
    })
});


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
