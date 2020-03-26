# iNET token and Exchange Specification.
This is the final and authoritative description of the iNET Token and Exchange.

### General

### Specification of the iNET Token
1. Symbol of InsureNET is iNET.
1. Name of the InsureNET token is "InsureNET Platform Protocol".
1. Decimals of the iNET token is 18 and 1 iNET is represented as `100000000000000000`.
1. Maximum Supply is 1,000,000,000 (1 Billion).
1. The Token Contract implements ERC20 Specifications according to https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md.

### Specifications of general Exchange parameters
1. Sale starts at `startTime` (inclusive).
1. Sale ends no later then `endTime` (inclusive).
1. A maximum of `hardcap` wei is raised.
1. All ether values are stored in `uint256` as wei.
1. All iNET token values are strored in `uint256` as 1E-18 fractions of tokens.
1. Conversion from ETH to iNET is done via a parameter `uint256 rate`.

Conversion is calculated as follows: # of iNET tokens = Amount in ETH * `rate`. Therefore, 1E-18 iNET = 1 wei * `rate`.

### Participants
1. Contributors are registered and stored in a mapping `contributorList`.
1. Elements of this mapping are `struct`s with fields, all of which default to zero:
    - `uint256 allowance`;
    - `uint256 contributionAmount`;
    - `uint256 tokensIssued`;
    - `Distribution distribution`;
    - `uint256 bonus`;
    - `uint256 lockupPeriod`;
1. `Distribution` is an `enum` with possible values: `{ canBuy, canConvertiNET, getsAirdrop }`.
1. The mapping of contributor types to the values of the `contributorList` is as follows: 
    1. Regular contributors: `distribution == canBuy`, `bonus == 0`, `lockupPeriod == 0`
    1. Early contributors without lockup period: identical to Regular contributors
    1. Early contributors with 1 year lockup period, 10% bonus: `distribution == canBuy`, `bonus == 10`, `lockupPeriod == 1`
    1. Early contributors with 1 year lockup period, 25% bonus (those Early contributors who sign the first 
    10M of ECAs): `distribution == canBuy`, `bonus == 10`, `lockupPeriod == 1`
    1. iNET Holders without lockup period: `distribution == canConvertiNET`, `bonus == 0`, `lockupPeriod == 0`
    1. iNET Holders with 1 year lockup period: `distribution == canConvertiNET`, `bonus == 4`, `lockupPeriod == 1`
    1. Team Members: `distribution == getsAirdrop`, `bonus == 0`, `lockupPeriod == 1`
    1. Founders: `distribution == getsAirdrop`, `bonus == 20`, `lockupPeriod == 2`
1. The `owner` of the TGE contract can fill and modify this list at any time by calling a function with 5 parameters.
The first parameter is an array of `address`es, the second an array of `allowance`s, the third parameter is an array 
of `distribution`s, the fourth parameter is an array of bonuses (`uint256`), the fifth parameter is an array of 
lockupPeriods (`uint256`).
For each `address` in the first parameter, the list is modified according to the second and third parameter.
The three arrays must have the same length, otherwise the function will throw.
1. A "Whitelisted contributor" is an address with `allowance > 0`.
1. During the Exchange Sale, the `contributionAmount` and `tokensIssued` are updated according to the investment made.

### Bonus
1. Contributors which sign an ECA with 1 year lockup get 10% bonus.
1. Contributors which sign an ECA with 1 year lockup and which are in the first 10M of signed ECAs, get 25% bonus.
1. iNET Holders which sign an ECA with 1 year lockup get 25% bonus.
(The Decision on bonus is made during whitelisting, but off-chain.)

## Token lock up
1. For Contributors and iNET Holders with `lockupPeriod == 1`, tokens are locked up for 1 year
1. Team members tokens are locked up for 1 year, Founders tokens are locked up for 2 years.

### Exchange Sale Phases
1. The phases of the Exchange Sale are delimited by the following parameters, denoted as `uint256`:
    - `startTime`
    - `startOpenPpTime`
    - `endTime`
1. Accordingly, the Exchange Sale has 4 phases: 
    - `pendingStart`:             after deployment, before `startTime`
    - `priorityPass`:             including and after `startTime`, before `startOpenPpTime`
    - `crowdsale`:                including and after `startPublicTime`, before and including `endTime`
    - `crowdsaleEnded`:           after `endTime`
1. The state of the contract is reflected in the `state` variable, which is an `enum` with possible values  
`{ pendingStart, priorityPass, crowdsale, crowdsaleEnded }`.
1. At every transaction, the state is checked and set according to the above conditions.
1. If `state = state.crowdsaleEnded` is set, a finalization function is called, which mints and distributes the remaining tokens.

### Investments 
1. In what follows, "invest/investment" means that the default function or the function `buyTokens` is called, the possible investment is calculated, the respective number of tokens is minted, and a possible surplus of funds is returned,
in case the `msg.value` is greater then the possible investment. "Participants" means distinct addresses.
1 `TEAM`, `FOUNDER` contributors are not allowed to call default function or the function `buyTokens`.
1. Participants can invest in one or more transactions. The contract keeps track of the amount invested so far in a field `contributionAmount` per participant.
1. Before the start of the Exchange Sale (in phase `state.pendingStart`), no investment is possible and the default function will throw.
1. After end of Exchange Sale (in phase `state.crowdsaleEnded`), no investment is possible and the default function will throw.
1. During the `priorityPass` phase, Whitelisted contributors can invest less or equal to the sum of their `allowance` (in wei).
1. During the `crowdsale` phase, Whitelisted contributors can invest unlimited amounts.
"unlimited" means "any amount that is greater zero and less or equal to `hardcap - weiRaised`"
1. During the `crowdsale` phase, everybody can invest unlimited amounts.
1. INVARIANTS: After each transaction, the following condition hold for all addresses `A`:

```
(

  now < startTime 
  && state == state.pendingStart 
  && weiRaised == 0

) && ( 
  
  now >= startTime && now < startOpenPpTime  
  && state == state.priorityPass 
  && weiRaised <= hardCap 
  && contributionAmount[A] <= allowance[A]

) && (
  
  now >= startOpenPpTime  && now <= endTime
  && state == state.crowdsale 
  && weiRaised <= hardCap

) && (

  now > endTime
  && state == state.crowdsaleEnded 
  && weiRaised <= hardCap

) && (

  weiRaised == sum(all x, contributionAmount[x])

)
```   


### Miscellaneous functions
1. The iNETToken.sol and EthSwap.sol contracts both contain a `salvageTokens` function. 
For the EthSwap.sol contract, it can be called by the owner to return tokens which have been sent to these contracts by mistake.
For the iNETToken.sol, the owner of the iNETToken.sol contract is changed in the finalization function of EthSwap.sol to 
the owner of the EthSwap.sol contract, who then can perform the function if necessary.




