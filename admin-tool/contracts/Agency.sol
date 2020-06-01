pragma solidity ^0.5.16;
// We have to specify what version of compiler this code will compile with

contract Agency {

//   event NewAgency(uint agencyId, string name, uint256 key);

//   uint256 keyDigits = 16;
//   uint256 keyModulus = 10 ** keyDigits;

//   //agency structure
//   struct Agency {
//     string name;
//     uint256 key;
//     string metadata;
//   }

//   Agency[] public agencies;

//   mapping (uint => address) public agencyToOwner;
//   mapping (address => uint) ownerAgencyCount;

//   function _createAgency(string memory _name, uint256 _key) internal {
//     uint256 id = agencies.push(Agency(_name, _key, "Add some data here")) - 1;
//     agencyToOwner[id] = msg.sender;
//     ownerAgencyCount[msg.sender]++;
//     emit NewAgency(id, _name, _key);
//   }

//   function _generateRandomAgencyKey(string memory _str) public view returns (uint256) {
//     uint256 rand = uint256(abi.encode(_str));
//     return rand;
//   }

//   function createNewAgency(string memory _name) public {
//     //make sure contract can only execute if user is not part of an agency
//     require(ownerAgencyCount[msg.sender] == 0, "You already have an Agency and Key");
//     uint256 randKey = _generateRandomAgencyKey(_name);
//     _createAgency(_name, randKey);
//   }
}