/**
 * FlightDelay with Oraclized Underwriting and Payout
 *
 * @description	Ocaclize API interface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */


pragma solidity 0.5.16;


import "../vendors/usingOraclize.sol";


contract HurricaneOraclizeInterface is usingOraclize {
  modifier onlyOraclizeOr (address _emergency) {
    require(msg.sender == oraclize_cbAddress() || msg.sender == _emergency, 'must be oracle');
    _;
  }
}