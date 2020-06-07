require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "outside bridge shrimp above piece myth acquire doll void filter fit reject";
const rop = 'process eternal ill spawn purpose replace solve humble mimic nothing element portion';
const ganache = 'evoke club entry catalog unveil truly run lyrics melt property main noise';
// prod mnemonic
//fat choice found vintage dry balcony sense bunker reject injury trip code pizza ghost defy
// 'wild obtain logic town crazy royal wall gloom fit robust correct sweet note: this mnemonic is not secure; don't use it on a public blockchain.
// 'wild obtain logic town crazy royal wall gloom fit robust correct sweet'

module.exports = {
  networks: {
    develop: {
      mnemonic: ganache,
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      websockets: true
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        rop,
        "https://ropsten.infura.io/v3/4a3706ac2ddf434fbc3ca2e68a746382"
      ),
      network_id: 3,
      gas: 5000000,
      gasPrice: 5000000000, // 5 Gwei
      skipDryRun: true
    },
    kovan: {
	    provider: new HDWalletProvider(rop, "https://kovan.infura.io/v3/4a3706ac2ddf434fbc3ca2e68a746382"),
	    network_id: 42,
	    gas: 5000000,
      gasPrice: 5000000000, // 5 Gwei
      skipDryRun: true
	  },
    main: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://mainnet.infura.io/v3/4a3706ac2ddf434fbc3ca2e68a746382",
      ),
      network_id: 5,
      gas: 4700000
    }
  },
  // Rinkeby: https://rinkeby.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b
  // Kovan: https://kovan.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  migrageions_directory: './migrations/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
