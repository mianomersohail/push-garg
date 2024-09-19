import React from 'react';
import './SolDocs.css'; // Assuming you will add styles in this file
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer';

const Documentation = () => {
  return (
      <>
      <Nav/>
    <div className="documentation">
      <h1>Deal Smart Contract Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          The <code>Deal</code> smart contract is designed to facilitate deals between buyers and sellers,
          where both parties lock a specified amount of Ether as collateral. The contract manages deposits,
          withdrawals, and deals, ensuring that both parties meet their obligations before completing a transaction.
        </p>
      </section>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Balance Management</strong>: Allows users to deposit and withdraw Ether.</li>
          <li><strong>Deal Creation</strong>: Enables users to create new deals with specified collateral.</li>
          <li><strong>Deal Agreement</strong>: Provides mechanisms for sellers and buyers to agree to and finalize deals.</li>
          <li><strong>Lock Management</strong>: Tracks locked amounts and handles collateral release upon deal completion.</li>
        </ul>
      </section>

      <section>
        <h2>Contract Structure</h2>

        <h3>Mappings</h3>
        <ul>
          <li><code>Balance</code>: Tracks the Ether balance of each user.</li>
          <li><code>LockedAmount</code>: Records the amount of Ether locked in ongoing deals for each user.</li>
          <li><code>UsesAddresses</code>: Indicates whether a user is currently involved in an ongoing deal.</li>
        </ul>

        <h3>Enum</h3>
        <ul>
          <li><code>Status</code>: Represents the current status of a deal:
            <ul>
              <li><code>DealAdd</code>: Deal has been created.</li>
              <li><code>SellerAgree</code>: Seller has agreed to the deal.</li>
              <li><code>SellerAgreeDeal</code>: Seller has agreed to continue the deal.</li>
              <li><code>BuyerAgreeeDeal</code>: Buyer has agreed to the deal.</li>
              <li><code>DealDone</code>: Deal is completed.</li>
            </ul>
          </li>
        </ul>

        <h3>Struct</h3>
        <ul>
          <li><code>NewDeal</code>: Defines a deal with the following properties:
            <ul>
              <li><code>Id</code>: Unique identifier of the deal.</li>
              <li><code>LockAmount</code>: Amount of Ether locked in the deal.</li>
              <li><code>Seller</code>: Address of the seller.</li>
              <li><code>Buyer</code>: Address of the buyer.</li>
              <li><code>status</code>: Current status of the deal.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2>Functions</h2>

        <h3><code>CheckBalance()</code></h3>
        <p>
          <strong>Description:</strong> Returns the Ether balance of the caller.<br />
          <strong>Returns:</strong> <code>uint</code> - The balance of the caller.
        </p>

        <h3><code>receive() external payable</code></h3>
        <p>
          <strong>Description:</strong> Allows the contract to receive Ether. Updates the caller's balance.<br />
          <strong>Requirements:</strong> <code>msg.value</code> must be greater than zero.
        </p>

        <h3><code>Withdraw(uint _amount)</code></h3>
        <p>
          <strong>Description:</strong> Allows users to withdraw a specified amount of Ether from their balance.<br />
          <strong>Parameters:</strong><br />
          <code>_amount</code>: The amount of Ether to withdraw.<br />
          <strong>Requirements:</strong><br />
          - User must have sufficient balance.<br />
          <strong>Effects:</strong><br />
          - Updates the user's balance and transfers Ether to the caller.
        </p>

        <h3><code>Deposit() public payable</code></h3>
        <p>
          <strong>Description:</strong> Allows users to deposit Ether into their balance.<br />
          <strong>Requirements:</strong> <code>msg.value</code> must be greater than zero.<br />
          <strong>Effects:</strong> Updates the user's balance.
        </p>

        <h3><code>AddNewDeal(address _Seller, uint _LockAmount)</code></h3>
        <p>
          <strong>Description:</strong> Creates a new deal with the specified seller and lock amount.<br />
          <strong>Parameters:</strong><br />
          <code>_Seller</code>: Address of the seller.<br />
          <code>_LockAmount</code>: Amount of Ether to lock in the deal.<br />
          <strong>Requirements:</strong><br />
          - Lock amount must be greater than zero.<br />
          - Caller must not be the same as the seller.<br />
          - Both buyer and seller must have sufficient balance.
        </p>

        <h3><code>SellerAgree(uint _Id)</code></h3>
        <p>
          <strong>Description:</strong> Allows the seller to agree to the deal.<br />
          <strong>Parameters:</strong><br />
          <code>_Id</code>: The ID of the deal.<br />
          <strong>Requirements:</strong><br />
          - Deal must be in the <code>DealAdd</code> status.<br />
          - Caller must be the seller of the deal.<br />
          - Both parties must have sufficient balance.<br />
          <strong>Effects:</strong><br />
          - Updates the deal status and locks the specified amount.
        </p>

        <h3><code>SellerAgreeDeal(uint _Id)</code></h3>
        <p>
          <strong>Description:</strong> Allows the seller to agree to continue the deal.<br />
          <strong>Parameters:</strong><br />
          <code>_Id</code>: The ID of the deal.<br />
          <strong>Requirements:</strong><br />
          - Caller must be the seller of the deal.<br />
          - Deal status must be <code>SellerAgree</code>.
        </p>

        <h3><code>BuyerAgree(uint _Id)</code></h3>
        <p>
          <strong>Description:</strong> Allows the buyer to agree to the deal and finalize it.<br />
          <strong>Parameters:</strong><br />
          <code>_Id</code>: The ID of the deal.<br />
          <strong>Requirements:</strong><br />
          - Deal status must be <code>SellerAgreeDeal</code>.<br />
          - Caller must be the buyer of the deal.<br />
          <strong>Effects:</strong><br />
          - Finalizes the deal and releases the locked amounts to both parties.<br />
          - Resets the <code>UsesAddresses</code> status for both parties.
        </p>
      </section>

      <section>
        <h2>Important Considerations</h2>
        <ul>
          <li><strong>Reentrancy</strong>: The <code>Withdraw</code> function uses <code>call</code> for transferring Ether to mitigate reentrancy attacks.</li>
          <li><strong>Error Handling</strong>: The contract uses <code>require</code> statements to handle errors and ensure correct behavior.</li>
          <li><strong>Testing</strong>: Thorough testing on a testnet is recommended before deploying on the mainnet.</li>
          <li><strong>Security</strong>: Consider additional security measures and audits to ensure the contract's robustness.</li>
        </ul>
      </section>

      <section>
        <h2>Example Usage</h2>
        
        <h3>Creating a Deal</h3>
        <ol>
          <li>A user calls <code>AddNewDeal</code> with the address of the seller and the lock amount.</li>
          <li>Both the buyer and the seller must have sufficient balance.</li>
        </ol>

        <h3>Agreeing to a Deal</h3>
        <ol>
          <li>The seller calls <code>SellerAgree</code> to agree to the deal.</li>
          <li>The seller must have sufficient balance and the deal must be in the <code>DealAdd</code> status.</li>
        </ol>

        <h3>Finalizing a Deal</h3>
        <ol>
          <li>The buyer calls <code>BuyerAgree</code> to finalize the deal.</li>
          <li>The deal status is updated to <code>DealDone</code>, and the locked amounts are released.</li>
        </ol>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Documentation;
