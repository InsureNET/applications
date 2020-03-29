/**
 * @title Policy Creator Contract
 * @dev InsureNET Decentralized Insurance Platform Policy Creator Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.0;

contract PolicyCreator {
    // State parameters
    address public policyHolder;

    // Mappings
    

    // Structs


    // Events
    event PolicyCreated(
        uint id,
        string name,
        uint256 price,
        uint256 converageAmount,
        address payable policyHolder,
        bool active
    );

    /**
    * @dev constructor
    */
    constructor() public {

    }

    function createPolicy (
        string memory _name,
        address payable _policyHolder,
        uint256 _price,
        uint256 _coverageAmt,
        uint256 _riskPoolAmt
    ) public payable {



        emit PolicyCreated(1, _name, _price, _coverageAmt, _policyHolder, true);
    }

}
