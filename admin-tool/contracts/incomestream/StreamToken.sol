pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract StreamToken is ERC777 {
    // cumulative amount that has been deposited to the contract for payments
    uint256 public paymentPerToken;
    

    // represents the amount credited to each account but not yet transferred to that account
    mapping(address => uint256) paymentBalanceOf;

    // amount per token that has been previously credited to the account
    mapping(address => uint256) paymentCreditedTo;
    
    
    constructor(
        uint256 initialSupply,
        address[] memory defaultOperators
    )
        ERC777("InsureNET Stream Token", "iNETs", defaultOperators)
        public
    {
        _mint(msg.sender, msg.sender, initialSupply, "", "");
    }

    // Track the status of payments owed to each account

    // Always in one of thrree states
    // 1. Already paid/transferred to account
    // 2. Already credited to the account but not yet transferred
    // 3. Not yet credited but contract has sufficient info to compute credit when needed

    // All new accounts start in the not yet credited status

    //  These three values track the three states of payments to each account, and all values are stored in wei

    function update(address account) internal {
        
    }


}