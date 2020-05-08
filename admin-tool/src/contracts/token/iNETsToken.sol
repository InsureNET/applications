pragma solidity  ^0.5.16;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

/**
*   @dev iNETsToken Stream Token ERC777
*       pool token for use in the investing in
*       other liquidity pools for earning.
*/
contract iNETsToken is ERC777 {
    // uint256 public amountOfDeposit;
    // uint256 public durationOfPayments;
    // uint256 public frequencyOfPayments;
    // uint256 public deadline;
    // uint256 public deferrmentDate;
    // uint256 public paymentAmount;
    // uint256 public streamReserveAmount = ((amountOfDeposit / durationOfPayments) / frequencyOfPayments) * 2; // Monthly payment reserve
    // uint256 public streamId;
    address payable public  owner;
    bytes public operatorData;
    bytes public userData;


    constructor(
        uint256 initialSupply,
        address[] memory defaultOperators
    )
        ERC777("Stream Token", "iNETs", defaultOperators)
        public
    {
        _mint(msg.sender, msg.sender, initialSupply, "", "");


    }
}