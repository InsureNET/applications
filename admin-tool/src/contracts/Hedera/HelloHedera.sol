pragma solidity ^0.5.16;

contract HelloHedera {
    string public message;
    uint256 public storedData;

    event MessageSet(string _message);
    event StorageSet(string _message);

    constructor(string memory initMessage) public {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        message = newMessage;
        emit MessageSet(message);
    }

    function set(uint256 x) public {
        storedData = x;
        emit StorageSet("Data stored successfully!");
    }

}