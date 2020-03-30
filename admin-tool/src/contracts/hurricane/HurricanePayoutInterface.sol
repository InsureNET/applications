/**
 * Oraclized Underwriting and Payout
 *
 * @description	Payout contract interface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */

pragma solidity 0.5.16;


contract HurricanePayoutInterface {
  function schedulePayoutOraclizeCall(uint _policyId, bytes32 _riskId, uint _offset) public;
}