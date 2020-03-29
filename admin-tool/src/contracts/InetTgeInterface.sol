/**
 * @title iNET Token Generating Event - TGE
 * @dev The Decentralized Insurance Platform Token.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

 pragma solidity ^0.5.0;

contract InetTgeInterface {
    function tokenIsLocked(address _contributor) public view returns (bool);
}