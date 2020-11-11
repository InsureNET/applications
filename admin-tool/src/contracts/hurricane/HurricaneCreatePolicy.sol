/**
 * @title Generic Prametric Hurricane Contract
 * @dev InsureNET Decentralized Insurance Platform
 *      Parametruc Hurricane Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./HurricaneConstants.sol";

 pragma solidity ^0.5.16;

contract HurricaneCreatePolicy is HurricaneConstants {
    /**
    * @dev state variables
    */
    using SafeMath for uint256;
    uint256 public minPremium = 25;
    uint256 public maxPremium = 500;

    mapping(address => uint256) public policyHolders;


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

    // Describe the Binder
    struct Binder {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool available;
    }

    // Describe the Product
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
        bool available;
    }

    // Describe the Agent
    struct Agent {
        uint id;
        string name;
        string title;
        uint commission;
        address payable owner;
        bool commissionPaid;
    }

    /**
    * @dev Constructor function
    */
    constructor() public {

    }

    /** @dev Functions */

    /**
    * @dev create a hurricane policy
    * @param _insured address of the policy owner
    * @param _value the premiu amount to pay
    */
    function createPolicy (
        address _insured,
        uint256 _value
    ) public payable returns (bool) {
        // ToDo: Checks



        return true;
    }



}