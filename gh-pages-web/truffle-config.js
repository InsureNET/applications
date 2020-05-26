require('babel-register');
require('babel-polyfill');
//require('dotenv').config();
// const mnemonic = process.env.MNEMONIC;
// const HDWalletProvider = require("truffle-hdwallet-provider");
// // // Create your own key for Production environments (https://infura.io/)
// const INFURA_ID = process.env.INFURA_ID || 'e8cc7c8e245b46b482873ce9382a542b';

const mnemonic = "";

// const configNetwok = (network, networkId, path = "m/44'/60'/0'/0/", gas = 4465030, gasPrice = 1e10) => ({
//   provider: () => new HDWalletProvider(
//     mnemonic, `https://${network}.infura.io/v3/${INFURA_ID}`, 
//         0, 1, true, path
//     ),
//   networkId,
//   gas,
//   gasPrice,
// });


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // Match any network id
    }
    // kovan: configNetwok('kovan', 42),
    // rinkeby: configNetwok('rinkeby', 4),
  },
  kovan: {
    provider: () => new HDWalletProvider(
      mnemonic,
      "https://kovan.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b"
    )
  },
  truffleteams: {
    provider: () => new HDWalletProvider(
        truffleMnemonic,
        truffleTeamsUrl
    ),
    network_id: 1587152359990
  },
  ropsten: {
    provider: () => new HDWalletProvider(
      mnemonic,
      "https://ropsten.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b"
    ),
    network_id: 3,
    gas: 4700000
  },
  main: {
    provider: () => new HDWalletProvider(
      mnemonic,
      "https://mainnet.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b",
    ),
    network_id: 1,
    gas: 4700000
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
