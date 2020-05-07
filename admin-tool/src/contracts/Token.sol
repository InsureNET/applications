/**
 * @title Token Contract
 * @dev InsureNET Decentralized Insurance Platform Token Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";


pragma solidity ^0.5.15;

/**
* @dev iNET Token Contract
*
* todo: make the token pausable so it must be held for a specified period of time.
*
*/
contract Token {
    string  public name = "iNET Token";
    string  public symbol = "iNET";
    uint256 public _totalSupply = 10**9 * 10**18; // 1 Billion tokens
    uint8   public decimals = 18;

    /**
    * @dev all distribution will add up to the 1 Billion tokens minted.
    */
    // Founder
<<<<<<< HEAD
    address payable founder  = 0xd2cCea05436bf27aE49B01726075449F815B683e;

    string public foundersAddress = '0xd2cCea05436bf27aE49B01726075449F815B683e';
=======
    address payable founder  = 0x39dD9FDAA2aA42766c0aee7d598D275768732eb8;
    address payable owner = 0x39dD9FDAA2aA42766c0aee7d598D275768732eb8;
    string public foundersAddress = '0x39dD9FDAA2aA42766c0aee7d598D275768732eb8';
>>>>>>> 254b9cfde080ee672fee22aea39024c72c570824
    uint256 public foundersDistribution = 100000000000000000000000000; // 100 Million Tokens

    // Partners, Bounties and Marketing
    string public partner1 = '';
    string public partner2 = '';
    uint256 public partner1Dist = 15000000000000000000000000 ; // 15 Million
    uint256 public partner2Dist = 15000000000000000000000000; // 15 Million
    uint256 public bountyDist = 20000000000000000000000000; // 20 Million
    uint256 public marketingDist = 100000000000000000000000000; // 100 Million

    // Public Sale
    uint256 public publicSaleDist = 750000000000000000000000000; // 750 Million

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // /**
    // * @dev Throws if called by any account other than the owner.
    // */
    modifier onlyOwner() {
        require(msg.sender == founder, 'Must me founder/owner');
        _;
    }


    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply();
        founder = msg.sender;
    }


    // function balanceOf(address _account) public view returns (uint256) {
    //     return _balanceOf[_account];
    // }


    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // function _melt(address account, uint256 amount) internal {
    //     require(account != address(0), "ERC20: melt from the zero address");
    //     require(amount > 0, "ERC20: value should be greater than 0");
    //     require(_frozen_balanceOf(account), "ERC20: not enough to melt");

    //     _frozen_sub(account, amount)
    //     _balances[account] = _balances[account].add(amount)
    // }

    // function _burnFrozen(address account, uint256 amount) internal {
    //     require(account != address(0), "ERC20: burn from the zero address");
    // }

    // function freezeTokens(address _account, uint256 _amount) public onlyOwner returns (bool) {
    //     _freeze(_account, _amount)
    //     emit Transfer(_account, address(this), _amount)
    //     return true;
    // }

    // function mentTokens(address _account, uint256 amount) public onlyMelter returns (bool) {
    //     _melt(_account, _amount)
    //     emit Transfer(_account, address(this), _amount)
    //     return true;
    // }

    // function mintFrozenTokens(address _account, uint256 amount) public onlyMinter {
    //     _mintfrozen(_account, amount)
    //     return true;
    // }

    // function mintBatchFrozenTokens(
    //     address[] calldata accounts,
    //     uint256[] calldata amounts
    // ) external onlyMinter returns (bool) {
    // }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, 'you need more ether');
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }


    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], 'not enough ether');
        require(_value <= allowance[_from][msg.sender], 'you are not allowed to spend that amount yet');
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}