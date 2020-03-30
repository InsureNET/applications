/**
 * FlightDelay with Oraclized Underwriting and Payout
 *
 * @description Controlled contract Interface
 * @copyright (c) 2020 InsureNET
 * @author Jason Romero
 */

pragma solidity 0.5.16;

import "./HurricaneControllerInterface.sol";
import "./HurricaneDatabaseModel.sol";

contract HurricaneControlledContract is HurricaneDatabaseModel {
  address public controller;
  HurricaneGuardControllerInterface internal HG_CI;

  modifier onlyController() {
    require(msg.sender == controller, 'the sender is not the controller');
    _;
  }

  function destruct() public onlyController {
    selfdestruct(controller);
  }

  // solhint-disable-next-line no-empty-blocks
  function setContracts() public onlyController {}

  function getContract(bytes32 _id) internal returns (address _addr) {
    _addr = HG_CI.getContract(_id);
  }

  function setController(address _controller) internal returns (bool _result) {
    controller = _controller;
    HG_CI = HurricaneControllerInterface(_controller);
    _result = true;
  }
}