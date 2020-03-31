/**
 * @title Generic Prametric Hurricane Contract
 * @dev InsureNET Decentralized Insurance Platform
 *      Parametruc Hurricane Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */
 
 pragma solidity ^0.5.16;

contract HurricaneCreatePolicy {

    /**
    * @dev Category of the hurricane
    */
    enum Category { THREE, FOUR, FIVE }

    /** State Properties */


    /** @dev Events */
    event PolicyCreated (
        uint256 id
    );

    /** @dev Policy Stuct */
    struct Policy {
        uint256 id;
    }


    /** @dev Functions */

    function createPolicy (
        address _insured,
        uint256 _value
    ) public returns (bool) {
        // ToDo: Checks



        return true;
    }



}