/**
 * FlightDelay with Oraclized Underwriting and Payout
 *
 * @description	Ocaclize API interface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */


pragma solidity 0.5.16;


import "../oracles/UsingOracle.sol";


contract HurricaneOraclizeInterface is UsingOracle {
  modifier onlyOraclizeOr (address _emergency) {
    
    //require(msg.sender == oracle_cbAddress() || msg.sender == _emergency);
    _;
  }
}