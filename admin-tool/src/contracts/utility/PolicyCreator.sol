/**
 * @title Policy Creator Contract
 * @dev InsureNET Decentralized Insurance Platform Policy Creator Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.16;

contract PolicyCreator {
    // State parameters
    address public policyHolder;
    uint256 public policyHolderCount;
    uint256 public fee = 1550;
    uint256 public policyCount;
    // ToDo: Formula for this
    uint256 public riskPoolAmountRequired;

    // Mappings


    // Structs
    struct Policy {
        uint id;
        string name;
        uint256 price;
        uint256 converageAmount;
        uint256 riskPoolRequirement;
        address payable policyHolder;
        uint256 fee;
        bool active;
    }

  // the risk structure; this structure keeps track of the risk-
  // specific parameters.
  // several policies can share the same risk structure
  // (typically same people in a specific geographic
  // area [market] for a particular season)
  struct Risk {
    // 0 - Market, "PR" for pilot
    bytes32 market;
    // 1 - Season, the current year
    bytes32 season;
    // 2 - the event category that triggered payouts
    bytes32 category;
    // 3 - we limit the cumulated weighted premium to avoid cluster risks
    uint cumulatedWeightedPremium;
    // 4 - max cumulated Payout for this risk
    uint premiumMultiplier;
  }

    // Events
    event PolicyCreated (
        uint id,
        string name,
        string policyNumber,
        uint256 price,
        uint256 converageAmount,
        uint256 riskPoolRequirement,
        address payable policyHolder,
        uint256 fee,
        bool active
    );

    event PolicyDestroyed (
        string reason
    );

    /**
    * @dev constructor
    */
    constructor() public {

    }

    /**
    * @dev createPolicy
    * @param _name name of the policy
    * @param _policyHolder address of the policyHolder
    * @param _price price of the policy
    * @param _fee fee for InsureNET
    * @param _coverageAmt coverage amount (amount of payout)
    * @param _riskPoolAmtRqd the amount needed to cover this policies risk
    *
    */
    function createPolicy (
        string memory _name,
        address payable _policyHolder,
        uint256 _price,
        uint256 _fee,
        uint256 _coverageAmt,
        uint256 _riskPoolAmtRqd
    ) public payable {

        policyCount ++;
        // ToDo: how do I want to do the policyNumber?? uuid??? custom???
        emit PolicyCreated(policyCount, _name, '<PolicyNumber>', _price, _coverageAmt, _riskPoolAmtRqd, _policyHolder, _fee, true);
    }


    function destroyPolicy (

    ) public {

        emit PolicyDestroyed('Felt like it');
    }

}
