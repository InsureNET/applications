/**
 * @title Generic POE Contract
 * @dev InsureNET Decentralized Insurance Platform POE Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.16;

// Proof of Existence contract, version 1
contract ProofOfExistence {
  // state
  bytes32 public proof;


  // calculate and store the proof for a document
  // *transactional function*
  function notarize(
    string memory _document
  ) public returns (bytes32) {
    proof = proofFor(_document);
    return proof;
  }


  // helper function to get a document's sha256
  // *read-only function*
  function proofFor(
    string memory _document
  ) internal returns (bytes32) {
    return sha256(abi.encode(_document));
  }


}