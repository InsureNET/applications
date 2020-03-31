const SocialNetwork = artifacts.require("SocialNetwork");
const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");
const DisasterBond = artifacts.require("DisasterBond");
const Marketplace = artifacts.require('Marketplace');
const PolicyCreator = artifacts.require('PolicyCreator');
const HurricanePolicyCreator = this.artifacts.require('HurricaneCreatePolicy')

module.exports = async function(deployer) {
  /**
   * @dev Deployments
   */
  await deployer.deploy(SocialNetwork);

  // Deploy Marketplace
  await deployer.deploy(Marketplace);
  const marketplace = await Marketplace.deployed();

  // Deploy Product Contracts
  await deployer.deploy(DisasterBond, '0x6F7d7d68c3Eed4Df81CF5F97582deef8ABC51533', 10, 5000);
  const disasterBond = await DisasterBond.deployed();

  // Deploy Policy Creator
  await deployer.deploy(PolicyCreator);
  //const polciyCreator = await polciyCreator.deployed();
  await deployer.deploy(HurricanePolicyCreator);

  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // Deploy EthSwap
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed()
  
  /**
   * @dev Transfers
   */
  // Transfer 750 Million tokens to EthSwap (100million)
  await token.transfer(ethSwap.address, '750000000000000000000000000');

  // Transfer to the founders wallet
  // 25 Million until I set up the rest of the accounts
  await token.transfer('0x6F7d7d68c3Eed4Df81CF5F97582deef8ABC51533', '25000000000000000000000000');

  // Transfer to the partners wallets


  // Transfer to the marketing wallet


  // Transfer to the bounties wallet

};
