require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");

// @link https://iancoleman.io/bip39/#english
const mnemonic24 = "hidden tourist piano double clip cement plug ostrich clay more mask same pride document shock payment elegant bar strategy food couple february myself riot";
const mnemonic18 = "sunny laundry elevator voice comfort swift inflict enforce latin palace advance grid bike delay opinion cinnamon glide make";
const mnemonic15 = "teach attack mammal surprise truck wage version omit arrive spring tuition fix skirt spell disease";
const ganacheMnemonic = "kitchen second runway skate faith blast hour arrow hill gadget addict eyebrow";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // 7545 for the GUI
      network_id: "*" // Match any network id
      // optional config values:
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
      // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
      //          - function that returns a web3 provider instance (see below.)
      //          - if specified, host and port are ignored.
      // skipDryRun: - true if you don't want to test run the migration locally before the actual migration (default is false)
      // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
    },
    hyperledgerfabric: {
      host: "127.0.0.1",
      port: 5000, // default Fab3 port
      network_id: "*",
      type: "fabric-evm"
    },
    test: {
      provider: function() {
        return new HDWalletProvider(mnemonic15, "http://127.0.0.1:8545/");
      },
      network_id: '*',
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        mnemonic15,
        "https://ropsten.infura.io/v3/"
      ),
      network_id: 3,
      gas: 4700000
    },
    main: {
      provider: () => new HDWalletProvider(
        mnemonic24,
        "https://mainnet.infura.io/v3/",
      ),
      network_id: 5,
      gas: 4700000
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // migrations_directory: "",
  mocha: {
    useColors: true
  },
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
