
pragma solidity 0.5.16;

import "@openzeppelin/contracts/math/SafeMath.sol";
import './ICOToken.sol';

contract Crowdsale {
    using SafeMath for uint256;

    bool public icoCompleted;
    uint256 public icoStartTime;
    uint256 public icoEndTime;
    uint256 public tokenRate;
    ICOToken public token;
    uint256 public fundingGoal;
    address payable public owner;
    uint256 public tokensRaised;
    uint256 public etherRaised;
    uint256 public rateOne = 5000;
    uint256 public rateTwo = 4000;
    uint256 public rateThree = 3000;
    uint256 public rateFour = 2000;
    uint256 public limitTierOne = 25e6 * (10 ** token.decimals());
    uint256 public limitTierTwo = 50e6 * (10 ** token.decimals());
    uint256 public limitTierThree = 75e6 * (10 ** token.decimals());
    uint256 public limitTierFour = 100e6 * (10 ** token.decimals());

    modifier whenIcoCompleted {
        require(icoCompleted);
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function () external payable {
        buy();
    }

    constructor(uint256 _icoStart, uint256 _icoEnd, uint256 _tokenRate, address _tokenAddress, uint256 _fundingGoal) public {
        require(_icoStart != 0 &&
            _icoEnd != 0 &&
            _icoStart < _icoEnd &&
            _tokenRate != 0 &&
            _tokenAddress != address(0) &&
            _fundingGoal != 0);

        icoStartTime = _icoStart;
        icoEndTime = _icoEnd;
        tokenRate = _tokenRate;
        token = ICOToken(_tokenAddress);
        fundingGoal = _fundingGoal;
        owner = msg.sender;
    }

    function calculateExcessTokens(
      uint256 amount,
      uint256 tokensThisTier,
      uint256 tierSelected,
      uint256 _rate
    ) public returns(uint256 totalTokens) {
        require(amount > 0 && tokensThisTier > 0 && _rate > 0);
        require(tierSelected >= 1 && tierSelected <= 4);

        uint weiThisTier = tokensThisTier.sub(tokensRaised).div(_rate);
        uint weiNextTier = amount.sub(weiThisTier);
        uint tokensNextTier = 0;
        bool returnTokens = false;

        // If there's excessive wei for the last tier, refund those
        if(tierSelected != 4)
            tokensNextTier = calculateTokensTier(weiNextTier, tierSelected.add(1));
        else
            returnTokens = true;

        totalTokens = tokensThisTier.sub(tokensRaised).add(tokensNextTier);

        // Do the transfer at the end
        if(returnTokens) msg.sender.transfer(weiNextTier);
   }

    function calculateTokensTier(uint256 weiPaid, uint256 tierSelected)
        internal view returns(uint256 calculatedTokens)
    {
        require(weiPaid > 0);
        require(tierSelected >= 1 && tierSelected <= 4);

        if(tierSelected == 1)
            calculatedTokens = weiPaid.mul(rateOne);
        else if(tierSelected == 2)
            calculatedTokens = weiPaid.mul(rateTwo);
        else if(tierSelected == 3)
            calculatedTokens = weiPaid.mul(rateThree);
        else
            calculatedTokens = weiPaid.mul(rateFour);
   }

    function buy() public payable {
    	require(tokensRaised < fundingGoal);
    	require(now < icoEndTime && now > icoStartTime);

        uint256 tokensToBuy;
    	uint256 etherUsed = msg.value;

    	// If the tokens raised are less than 25 million with decimals, apply the first rate
    	if(tokensRaised < limitTierOne) {
    	    // Tier 1
    		tokensToBuy = etherUsed * (10 ** token.decimals()) / 1 ether * rateOne;

    		// If the amount of tokens that you want to buy gets out of this tier
    		if(tokensRaised + tokensToBuy > limitTierOne) {
    			tokensToBuy = calculateExcessTokens(etherUsed, limitTierOne, 1, rateOne);
    		}
    	} else if(tokensRaised >= limitTierOne && tokensRaised < limitTierTwo) {
    	    // Tier 2
            tokensToBuy = etherUsed * (10 ** token.decimals()) / 1 ether * rateTwo;

            // If the amount of tokens that you want to buy gets out of this tier
       		if(tokensRaised + tokensToBuy > limitTierTwo) {
    			tokensToBuy = calculateExcessTokens(etherUsed, limitTierTwo, 2, rateTwo);
    		}
        } else if(tokensRaised >= limitTierTwo && tokensRaised < limitTierThree) {
            // Tier 3
            tokensToBuy = etherUsed * (10 ** token.decimals()) / 1 ether * rateThree;

            // If the amount of tokens that you want to buy gets out of this tier
       		if(tokensRaised + tokensToBuy > limitTierThree) {
    			tokensToBuy = calculateExcessTokens(etherUsed, limitTierThree, 3, rateThree);
    		}
        } else if(tokensRaised >= limitTierThree) {
            // Tier 4
            tokensToBuy = etherUsed * (10 ** token.decimals()) / 1 ether * rateFour;
        }

    	// Check if we have reached and exceeded the funding goal to refund the exceeding tokens and ether
    	if(tokensRaised + tokensToBuy > fundingGoal) {
    		uint256 exceedingTokens = tokensRaised + tokensToBuy - fundingGoal;
    		uint256 exceedingEther;

    		// Convert the exceedingTokens to ether and refund that ether
    		exceedingEther = exceedingTokens * 1 ether / tokenRate / token.decimals();
    		msg.sender.transfer(exceedingEther);

    		// Change the tokens to buy to the new number
    		tokensToBuy -= exceedingTokens;

    		// Update the counter of ether used
    		etherUsed -= exceedingEther;
    	}

    	// Send the tokens to the buyer
    	token.buyTokens(msg.sender, tokensToBuy);

    	// Increase the tokens raised and ether raised state variables
    	tokensRaised += tokensToBuy;
    }

    function extractEther() public whenIcoCompleted onlyOwner {
        owner.transfer(address(this).balance);
    }
}