/**
 * Oraclized Underwriting and Payout
 *
 * @description	Ledger contract interface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */

pragma solidity 0.5.16;

import "./HurricaneDatabaseModel.sol";


contract HurricaneLedgerInterface is HurricaneDatabaseModel {
  function receiveFunds(Acc _to) public payable;

  function sendFunds(address _recipient, Acc _from, uint _amount) public returns (bool _success);

  function bookkeeping(Acc _from, Acc _to, uint amount) public;
}