const SocialNetwork = artifacts.require('SocialNetwork');
const StreamToken = artifacts.require('iNETsToken');
const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');
//const DisasterBond = artifacts.require('DisasterBond')
const Marketplace = artifacts.require('Marketplace');
const PolicyCreator = artifacts.require('PolicyCreator');
const HurricanePolicyCreator = this.artifacts.require('HurricaneCreatePolicy');
const POE = artifacts.require('ProofOfExistence');
const DaiFaucet = require('DaiFaucet');

module.exports = async function(deployer, network, accounts) {
	/**
	 * @dev Deployments
	 */
	try {
		let lendingPoolAddressesProviderAddress;
		switch (network) {
			case 'mainnet':
			case 'mainnet-fork':
			case 'development': // For Ganache mainnet forks
				lendingPoolAddressesProviderAddress = '0x24a42fD28C976A61Df5D00D0599C34c4f90748c8';
				break;
			case 'ropsten':
			case 'ropsten-fork':
				lendingPoolAddressesProviderAddress = '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728';
				break;
			case 'kovan':
			case 'kovan-fork':
				lendingPoolAddressesProviderAddress = '0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5';
				break;
			default:
				throw Error(`Are you deploying to the correct network? (network selected: ${network})`);
		}

		await deployer.deploy(SocialNetwork);

		await deployer.deploy(DaiFaucet);

		// POE
		await deployer.deploy(POE);

		// Deploy Product Contracts
		//await deployer.deploy(DisasterBond, '0x51Caa385AB6363F6dF543BaEbe9501F057A8638e', 10, 5000);
		//const disasterBond = await DisasterBond.deployed();

		// Deploy Policy Creator
		// await deployer.deploy(PolicyCreator)
		// const polciyCreator = await polciyCreator.deployed()

		// Deploy Token
		//await deployer.deploy(StreamToken, '750000000000000000000000000', ['0xb6498080D032a5cede8d03feA95b693596b87580'])
		await deployer.deploy(Token);
		const token = await Token.deployed();

		// Deploy EthSwap
		await deployer.deploy(EthSwap, token.address);
		const ethSwap = await EthSwap.deployed();

		// Deploy Marketplace
		await deployer.deploy(Marketplace);
		//const marketplace = await Marketplace.deployed()
		await deployer.deploy(HurricanePolicyCreator);

		/**
		 * @dev Transfers
		 */
		// Transfer 750 Million tokens to EthSwap (100million)
		await token.transfer(ethSwap.address, '750000000000000000000000000');

		// Transfer to the founders wallet
		// 25 Million until I set up the rest of the accounts
		await token.transfer('0xb6498080D032a5cede8d03feA95b693596b87580', '25000000000000000000000000');

		// Transfer to the partners wallets

		// Transfer to the marketing wallet

		// Transfer to the bounties wallet
	} catch (error) {
		console.log(`Error in migration: ${error.message}`);
	}
};
