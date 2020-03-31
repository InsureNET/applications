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
    enum Outcome { NONE, DISASTER_HAPPEN, DISASTER_NOT_HAPPEN, VOID, OTHER }

    // state properties
    uint public principal;
    uint public coupon;
    address public oracle;
    address payable public sponsor;
    address payable public investor;
    uint public end;

    Outcome outcome;

    // Constructor (runs only once upon deployment)
    constructor(address _oracle, uint _principal, uint _duration) public payable {
        oracle = _oracle;
        principal = _principal;
        coupon = msg.value;
        sponsor = msg.sender;
        end = now + _duration;
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
        if(_outcome == Outcome.DISASTER_HAPPEN) {
            // transfer to sponser
            sponsor.transfer(principal);
            
        } else if(_outcome == Outcome.DISASTER_NOT_HAPPEN) {
            // give back to investor
            investor.transfer(principal);

        } else {
            // default to investor
            investor.transfer(principal);
        }

    }






}