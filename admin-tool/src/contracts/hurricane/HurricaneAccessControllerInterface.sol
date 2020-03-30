/**
 * Oraclized Underwriting and Payout
 *
 * @description	AccessControllerInterface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */


pragma solidity 0.5.16;


contract HurricaneAccessControllerInterface {
  function setPermissionById(uint8 _perm, bytes32 _id) public;

  function setPermissionById(uint8 _perm, bytes32 _id, bool _access) public;

  function setPermissionByAddress(uint8 _perm, address _addr) public;

  function setPermissionByAddress(uint8 _perm, address _addr, bool _access) public;

  function checkPermission(uint8 _perm, address _addr) public returns (bool _success);
}