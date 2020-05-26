pragma solidity 0.5.16;

import './Token.sol';

contract ICOToken is Token {
	string public name = 'ICOToken';
	string public symbol = 'ITK';
	uint256 public decimals = 18;
	address public crowdsaleAddress;
	address payable public owner;
	uint256 public ICOEndTime;

	modifier onlyCrowdsale {
		require(msg.sender == crowdsaleAddress);
		_;
	}

	modifier onlyOwner {
		require(msg.sender == owner);
		_;
	}

	modifier afterCrowdsale {
		require(now > ICOEndTime || msg.sender == crowdsaleAddress);
		_;
	}

	constructor (uint256 _ICOEndTime) public Token() {
		require(_ICOEndTime > 0);
	        _totalSupply = 100e24;
		owner = msg.sender;
		ICOEndTime = _ICOEndTime;
	}

	function setCrowdsale(address _crowdsaleAddress) public onlyOwner {
		require(_crowdsaleAddress != address(0));
		crowdsaleAddress = _crowdsaleAddress;
	}

	function buyTokens(address _receiver, uint256 _amount) public onlyCrowdsale {
		require(_receiver != address(0));
		require(_amount > 0);
		transfer(_receiver, _amount);
	}

    /// @notice Override the functions to not allow token transfers until the end of the ICO
    function transfer(address _to, uint256 _value) public afterCrowdsale returns(bool) {
        return super.transfer(_to, _value);
    }

    /// @notice Override the functions to not allow token transfers until the end of the ICO
    function transferFrom(address _from, address _to, uint256 _value) public afterCrowdsale returns(bool) {
        return super.transferFrom(_from, _to, _value);
    }

    /// @notice Override the functions to not allow token transfers until the end of the ICO
    function approve(address _spender, uint256 _value) public afterCrowdsale returns(bool) {
        return super.approve(_spender, _value);
    }

    /// @notice Override the functions to not allow token transfers until the end of the ICO
    // function increaseApproval(address _spender, uint _addedValue) public afterCrowdsale returns(bool success) {
    //     return super.increaseApproval(_spender, _addedValue);
    // }

    /// @notice Override the functions to not allow token transfers until the end of the ICO
    // function decreaseApproval(address _spender, uint _subtractedValue) public afterCrowdsale returns(bool success) {
    //     return super.decreaseApproval(_spender, _subtractedValue);
    // }

    function emergencyExtract() external onlyOwner {
        owner.transfer(address(this).balance);
    }
}