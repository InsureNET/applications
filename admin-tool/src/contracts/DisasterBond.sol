/**
 * @title Generic Disaster Bond Contract
 * @dev InsureNET Decentralized Insurance Platform Distaster Bond Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.16;

contract DisasterBond {
    /**
    * @dev Outcome of the event
    * @param none
    */
    enum Outcome { NONE, CAT_3, CAT_4, CAT_5, VOID, OTHER }

    // state properties
    uint public principal;
    uint public coupon;
    address payable public oracle;
    address payable public insured;
    address payable public investor;
    uint public end;

    Outcome outcome;

    // Constructor (runs only once upon deployment)
    constructor(address payable _oracle, uint256 _principal, uint256 _duration) public payable {
        oracle = _oracle;
        principal = _principal;
        coupon = msg.value;
        investor = msg.sender;
        end = block.timestamp + _duration;
    }

    // called by application to invest in a coupon
    function invest() external payable {
        require(investor == address(0), 'investor already registered');
        require(msg.value == principal, 'not enough money sent');
        require(now < end, 'too late');

        //
        investor = msg.sender;
        investor.transfer(coupon);
    }

    // Called by oracle to report the outcome
    function reportOutcome(Outcome _outcome) external {
        require(msg.sender == oracle, 'only oracle can report outcome');
        require(investor != address(0), 'no investor registered');
        require(now < end, 'too late');

        outcome = _outcome;

        //
        if(_outcome == Outcome.CAT_3) {
            // transfer to sponser
            insured.transfer(principal);
            
        } if(_outcome == Outcome.CAT_4) {
            // transfer to sponser
            insured.transfer(principal);
            
        } if(_outcome == Outcome.CAT_5) {
            // transfer to sponser
            insured.transfer(principal);
            
        } else if(_outcome == Outcome.VOID) {
            // give back to insured
            investor.transfer(principal);

        } else {
            // default to insured
            investor.transfer(principal);
        }
    }
}