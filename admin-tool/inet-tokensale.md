# iNET token and Exchange Specification.

This is the final and authoritative description of the iNET Token and Exchange.

### General

### Specification of the iNET Token

1. Symbol of InsureNET is iNET.
2. Name of the InsureNET token is "InsureNET Platform Protocol".
3. Decimals of the iNET token is 18 and 1 iNET is represented as `100000000000000000`.
4. Maximum Supply is 1,000,000,000 \(1 Billion\).
5. The Token Contract implements ERC20 Specifications according to [https://eips.ethereum.org/EIPS/eip-20](https://eips.ethereum.org/EIPS/eip-20).

### Specifications of general Exchange parameters

1. Sale starts at `startTime` \(inclusive\).
2. Sale ends no later then `endTime` \(inclusive\).
3. A maximum of `hardcap` wei is raised.
4. All ether values are stored in `uint256` as wei.
5. All iNET token values are strored in `uint256` as 1E-18 fractions of tokens.
6. Conversion from ETH to iNET is done via a parameter `uint256 rate`.

Conversion is calculated as follows: \# of iNET tokens = Amount in ETH  _`rate`. Therefore, 1E-18 iNET = 1 wei_  `rate`.

### Participants

1. Contributors are registered and stored in a mapping `contributorList`.
2. Elements of this mapping are `struct`s with fields, all of which default to zero:
   * `uint256 allowance`;
   * `uint256 contributionAmount`;
   * `uint256 tokensIssued`;
   * `Distribution distribution`;
   * `uint256 bonus`;
   * `uint256 lockupPeriod`;
3. `Distribution` is an `enum` with possible values: `{ canBuy, canConvertiNET, getsAirdrop }`.
4. The mapping of contributor types to the values of the `contributorList` is as follows: 
   1. Regular contributors: `distribution == canBuy`, `bonus == 0`, `lockupPeriod == 0`
   2. Early contributors without lockup period: identical to Regular contributors
   3. Early contributors with 1 year lockup period, 10% bonus: `distribution == canBuy`, `bonus == 10`, `lockupPeriod == 1`
   4. Early contributors with 1 year lockup period, 25% bonus \(those Early contributors who sign the first 

      10M of ECAs\): `distribution == canBuy`, `bonus == 10`, `lockupPeriod == 1`

   5. iNET Holders without lockup period: `distribution == canConvertiNET`, `bonus == 0`, `lockupPeriod == 0`
   6. iNET Holders with 1 year lockup period: `distribution == canConvertiNET`, `bonus == 4`, `lockupPeriod == 1`
   7. Team Members: `distribution == getsAirdrop`, `bonus == 0`, `lockupPeriod == 1`
   8. Founders: `distribution == getsAirdrop`, `bonus == 20`, `lockupPeriod == 2`
5. The `owner` of the TGE contract can fill and modify this list at any time by calling a function with 5 parameters.

   The first parameter is an array of `address`es, the second an array of `allowance`s, the third parameter is an array 

   of `distribution`s, the fourth parameter is an array of bonuses \(`uint256`\), the fifth parameter is an array of 

   lockupPeriods \(`uint256`\).

   For each `address` in the first parameter, the list is modified according to the second and third parameter.

   The three arrays must have the same length, otherwise the function will throw.

6. A "Whitelisted contributor" is an address with `allowance > 0`.
7. During the Exchange Sale, the `contributionAmount` and `tokensIssued` are updated according to the investment made.

### Bonus

1. Contributors which sign an ECA with 1 year lockup get 10% bonus.
2. Contributors which sign an ECA with 1 year lockup and which are in the first 10M of signed ECAs, get 25% bonus.
3. iNET Holders which sign an ECA with 1 year lockup get 25% bonus.

   \(The Decision on bonus is made during whitelisting, but off-chain.\)

## Token lock up

1. For Contributors and iNET Holders with `lockupPeriod == 1`, tokens are locked up for 1 year
2. Team members tokens are locked up for 1 year, Founders tokens are locked up for 2 years.

### Exchange Sale Phases

1. The phases of the Exchange Sale are delimited by the following parameters, denoted as `uint256`:
   * `startTime`
   * `startOpenPpTime`
   * `endTime`
2. Accordingly, the Exchange Sale has 4 phases: 
   * `pendingStart`:             after deployment, before `startTime`
   * `priorityPass`:             including and after `startTime`, before `startOpenPpTime`
   * `crowdsale`:                including and after `startPublicTime`, before and including `endTime`
   * `crowdsaleEnded`:           after `endTime`
3. The state of the contract is reflected in the `state` variable, which is an `enum` with possible values  

   `{ pendingStart, priorityPass, crowdsale, crowdsaleEnded }`.

4. At every transaction, the state is checked and set according to the above conditions.
5. If `state = state.crowdsaleEnded` is set, a finalization function is called, which mints and distributes the remaining tokens.

### Investments

1. In what follows, "invest/investment" means that the default function or the function `buyTokens` is called, the possible investment is calculated, the respective number of tokens is minted, and a possible surplus of funds is returned,

   in case the `msg.value` is greater then the possible investment. "Participants" means distinct addresses.

   1 `TEAM`, `FOUNDER` contributors are not allowed to call default function or the function `buyTokens`.

2. Participants can invest in one or more transactions. The contract keeps track of the amount invested so far in a field `contributionAmount` per participant.
3. Before the start of the Exchange Sale \(in phase `state.pendingStart`\), no investment is possible and the default function will throw.
4. After end of Exchange Sale \(in phase `state.crowdsaleEnded`\), no investment is possible and the default function will throw.
5. During the `priorityPass` phase, Whitelisted contributors can invest less or equal to the sum of their `allowance` \(in wei\).
6. During the `crowdsale` phase, Whitelisted contributors can invest unlimited amounts.

   "unlimited" means "any amount that is greater zero and less or equal to `hardcap - weiRaised`"

7. During the `crowdsale` phase, everybody can invest unlimited amounts.
8. INVARIANTS: After each transaction, the following condition hold for all addresses `A`:

```text
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

