/**
 * @title iNET Token Generating Event - TGE
 * @dev The Decentralized Insurance Platform Token.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';

contract InetWhitelistedCrowdsale is Ownable {
  using SafeMath for uint256;

  struct ContributorData {
    uint256 allowance;
    uint256 contributionAmount;
    uint256 tokensIssued;
    bool airdrop;
    uint256 bonus;        // 0 == 0%, 4 == 25%, 10 == 10%
    uint256 lockupPeriod; // 0, 1 or 2 (years)
  }

  mapping (address => ContributorData) public contributorList;

  event Whitelisted(address indexed _contributor, uint256 _allowance, bool _airdrop, uint256 _bonus, uint256 _lockupPeriod);

  /**
   * Push contributor data to the contract before the crowdsale
   */
  function editContributors (
    address[] memory _contributorAddresses,
    uint256[] memory _contributorAllowance,
    bool[] memory _airdrop,
    uint256[] memory _bonus,
    uint256[] memory _lockupPeriod
  ) public onlyOwner{
    // Check if input data is consistent
    require(
      _contributorAddresses.length == _contributorAllowance.length &&
      _contributorAddresses.length == _airdrop.length &&
      _contributorAddresses.length == _bonus.length &&
      _contributorAddresses.length == _lockupPeriod.length,
      'You are not an authorized contributor'
    );

    for (uint256 cnt = 0; cnt < _contributorAddresses.length; cnt = cnt.add(1)) {
      require(_bonus[cnt] == 0 || _bonus[cnt] == 4 || _bonus[cnt] == 10, 'bonus type/value is not correct');
      require(_lockupPeriod[cnt] <= 2, 'lockup period not over');

      address contributor = _contributorAddresses[cnt];
      contributorList[contributor].allowance = _contributorAllowance[cnt];
      contributorList[contributor].airdrop = _airdrop[cnt];
      contributorList[contributor].bonus = _bonus[cnt];
      contributorList[contributor].lockupPeriod = _lockupPeriod[cnt];

      emit Whitelisted(
        _contributorAddresses[cnt],
        _contributorAllowance[cnt],
        _airdrop[cnt],
        _bonus[cnt],
        _lockupPeriod[cnt]
      );
    }
  }

}