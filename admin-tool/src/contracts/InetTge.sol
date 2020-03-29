/**
 * @title iNET Token Generating Event - TGE
 * @notice The Decentralized Insurance Platform Token.
 * @author Jason Romero
 *
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/crowdsale/distribution/FinalizableCrowdsale.sol";
import "./Token.sol";
import "./InetWhitelistedCrowdsale.sol";


contract InetTge is InetWhitelistedCrowdsale, FinalizableCrowdsale {

  using SafeMath for uint256;

  enum state { preSale, priorityPass, crowdsale, crowdsaleEnded }

//   uint256 public startOpenPreSaleTime;
//   uint256 public hardCap;
//   uint256 public lockInTime1; // token lock-in period for team, ECA, US accredited investors
//   uint256 public lockInTime2; // token lock-in period for founders
//   state public crowdsaleState = state.preSale;

//   event InetTgeStarted(uint256 _time);
//   event CrowdsaleStarted(uint256 _time);
//   event HardCapReached(uint256 _time);
//   event InetTgeEnded(uint256 _time);
//   event TokenAllocated(address _beneficiary, uint256 _amount);

//   constructor(
//     uint256 _startTime,
//     uint256 _startOpenPreSaleTime,
//     uint256 _endTime,
//     uint256 _lockInTime1,
//     uint256 _lockInTime2,
//     uint256 _hardCap,
//     uint256 _rate,
//     address _wallet
//   )
//     Crowdsale(_startTime, _endTime, _rate, _wallet)
//     public
//   {
//     // Check arguments
//     require(_startTime >= block.timestamp, '');
//     require(_startOpenPreSaleTime >= _startTime, '');
//     require(_endTime >= _startOpenPreSaleTime, '');
//     require(_lockInTime1 >= _endTime, '');
//     require(_lockInTime2 > _lockInTime1, '');
//     require(_hardCap > 0, '');
//     require(_rate > 0, '');
//     //require(_wallet != 0x0, '');

//     // Set contract fields
//     startOpenPreSaleTime = _startOpenPreSaleTime;
//     hardCap = _hardCap;
//     lockInTime1 = _lockInTime1;
//     lockInTime2 = _lockInTime2;
//     //Token(token).pause();
//   }

//   function setRate(uint256 _rate) public onlyOwner {
//     require(crowdsaleState == state.preSale, '');

//     rate = _rate;
//   }

//   function unpauseToken() external onlyOwner{
//     Token(token).unpause();
//   }

//   /**
//    * Calculate the maximum remaining contribution allowed for an address
//    * @param  _contributor the address of the contributor
//    * @return maxContribution maximum allowed amount in wei
//    */
//   function calculateMaxContribution(address _contributor) public view returns (uint256 _maxContribution) {
//     uint256 maxContrib = 0;

//     if (crowdsaleState == state.priorityPass) {
//       maxContrib = contributorList[_contributor].allowance.sub(contributorList[_contributor].contributionAmount);

//       if (maxContrib > hardCap.sub(weiRaised)) {
//         maxContrib = hardCap.sub(weiRaised);
//       }
//     } else if (crowdsaleState == state.crowdsale) {
//       if (contributorList[_contributor].allowance > 0) {
//         maxContrib = hardCap.sub(weiRaised);
//       }
//     }

//     return maxContrib;
//   }

//   /**
//    * Calculate amount of tokens
//    * This is used twice:
//    * 1) For calculation of token amount plus optional bonus from wei amount contributed
//    * In this case, rate is the defined exchange rate of ETH against DIP.
//    * 2) For calculation of token amount plus optional bonus from DIP token amount
//    * In the second case, rate == 1 because we have already calculated DIP tokens from RSC amount
//    * by applying a factor of 10/32.
//    * @param _contributor the address of the contributor
//    * @param _amount contribution amount
//    * @return _tokens amount of tokens
//    */
//   function calculateTokens(address _contributor, uint256 _amount, uint256 _rate) public view returns (uint256 _tokens) {
//     uint256 bonus = contributorList[_contributor].bonus;

//     assert(bonus == 0 || bonus == 4 || bonus == 10);

//     if (bonus > 0) {
//       _tokens = _amount.add(_amount.div(bonus)).mul(_rate);
//     } else {
//       _tokens = _amount.mul(_rate);
//     }
//   }

//   /**
//    * Set the current state of the crowdsale.
//    */
//   function setCrowdsaleState() public {
//     if (weiRaised >= hardCap && crowdsaleState != state.crowdsaleEnded) {

//       crowdsaleState = state.crowdsaleEnded;
//       emit HardCapReached(block.timestamp);
//       emit InetTgeEnded(block.timestamp);

//     } else if (
//       //block.timestamp >= startTime &&
//       //block.timestamp < startOpenPpTime &&
//       crowdsaleState != state.priorityPass
//     ) {

//       crowdsaleState = state.priorityPass;
//       emit InetTgeStarted(block.timestamp);

//     } else if (
//       //block.timestamp >= startOpenPpTime &&
//       //block.timestamp <= endTime &&
//       crowdsaleState != state.crowdsale
//     ) {

//       crowdsaleState = state.crowdsale;
//       emit CrowdsaleStarted(block.timestamp);

//     } else if (
//       crowdsaleState != state.crowdsaleEnded //&&
//       //block.timestamp > endTime
//     ) {

//       crowdsaleState = state.crowdsaleEnded;
//       emit InetTgeEnded(block.timestamp);
//     }
    
//   }


//   /**
//    * The token buying function.
//    * @param  _beneficiary  receiver of tokens.
//    */
//   function buyTokens(address _beneficiary) public payable {
//     require(_beneficiary != 0x0, '');
//     //require(validPurchase(), '');
//     require(contributorList[_beneficiary].airdrop == false, '');

//     setCrowdsaleState();

//     uint256 weiAmount = msg.value;
//     uint256 maxContrib = calculateMaxContribution(_beneficiary);
//     uint256 refund;

//     if (weiAmount > maxContrib) {
//       refund = weiAmount.sub(maxContrib);
//       weiAmount = maxContrib;
//     }

//     // stop here if transaction does not yield tokens
//     require(weiAmount > 0, '');

//     // calculate token amount to be created
//     uint256 tokens = calculateTokens(_beneficiary, weiAmount, rate);

//     assert(tokens > 0);

//     // update state
//     weiRaised = weiRaised.add(weiAmount);

//     require(token.mint(_beneficiary, tokens), '');
//     emit TokensPurchased(msg.sender, _beneficiary, weiAmount, tokens);

//     contributorList[_beneficiary].contributionAmount = contributorList[_beneficiary].contributionAmount.add(weiAmount);
//     contributorList[_beneficiary].tokensIssued = contributorList[_beneficiary].tokensIssued.add(tokens);

//     wallet.transfer(weiAmount);

//     if (refund != 0) _beneficiary.transfer(refund);
//   }

//   /**
//    * Check if token is locked.
//    */
//   function tokenIsLocked(address _contributor) public view returns (bool) {

//     if (block.timestamp < lockInTime1 && contributorList[_contributor].lockupPeriod == 1) {
//       return true;
//     } else if (block.timestamp < lockInTime2 && contributorList[_contributor].lockupPeriod == 2) {
//       return true;
//     }

//     return false;

//   }


//   /**
//    * Distribute tokens to selected team members & founders.
//    * Unit of Allowance is ETH and is converted in number of tokens by multiplying with Rate.
//    * This can be called by any whitelisted beneficiary.
//    */
//   function airdrop() public {
//     airdropFor(msg.sender);
//   }


//   /**
//    * Alternatively to airdrop(); tokens can be directly sent to beneficiaries by this function
//    * This can be called only once.
//    */
//   function airdropFor(address _beneficiary) public {
//     require(_beneficiary != 0x0, '');
//     require(contributorList[_beneficiary].airdrop == true, '');
//     require(contributorList[_beneficiary].tokensIssued == 0, '');
//     require(contributorList[_beneficiary].allowance > 0, '');

//     setCrowdsaleState();

//     require(crowdsaleState == state.crowdsaleEnded, '');

//     uint256 amount = contributorList[_beneficiary].allowance.mul(rate);
//     require(token.mint(_beneficiary, amount), '');
//     emit TokenAllocated(_beneficiary, amount);

//     contributorList[_beneficiary].tokensIssued = contributorList[_beneficiary].tokensIssued.add(amount);
//   }

//   /**
//    * Creates an new ERC20 Token contract for the iNETr Token.
//    * Overrides Crowdsale function
//    * @return the created token
//    */
//   function createTokenContract() internal returns (ERC20Mintable) {
//     return new Token();
//   }

//   /**
//    * Finalize sale and perform cleanup actions.
//    */
//   function finalization() internal {
//     uint256 maxSupply = Token(token).MAXIMUM_SUPPLY();
//     token.mint(wallet, maxSupply.sub(token.totalSupply())); // Alternativly, hardcode remaining token distribution.
//     token.finishMinting();
//     token.transferOwnership(owner);
//   }

//   /**
//    * Owner can transfer back tokens which have been sent to this contract by mistake.
//    * @param  _token address of token contract of the respective tokens
//    * @param  _to where to send the tokens
//    */
//   function salvageTokens(ERC20 _token, address _to) external onlyOwner {
//     _token.transfer(_to, _token.balanceOf(this));
//   }
}