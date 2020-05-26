/**
 * Oraclized Underwriting and Payout
 *
 * @description	Underwrite contract interface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */

pragma solidity ^0.5.16;

contract HurricaneUnderwriteInterface {
  function scheduleUnderwriteOraclizeCall(uint _policyId, bytes32 _latlng) public;
}