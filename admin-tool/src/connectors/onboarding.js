import Onboard from 'bnc-onboard';
import Web3 from 'web3';

const INFURA_PROJ_ID = '';
const INFURA_PROJ_SECRET = '';
const RPC_URL = '';

const onboard = Onboard({
    dappId: '',
    networkId: (process.env.NODE_ENV === 'dev' ? 3 : 5777),
    subscriptions: {
        address: addrress => { console.log('address: ', address) },
        network: network => { console.log('network: ', network) },
        balance: balance => { console.log('balance: ', balance) },
        wallet: wallet => {
            let web3 = new Web3(wallet.provider)
            console.log(wallet)
            console.log(web3)
        }
    },
    walletSelect: {
        wallets: [
            { walletName: "metamask", preferred: true },
            { walletName: "coinbase", preferred: true },
            { walletName: "trust", preferred: true },
            { walletName: "walletConnect", preferred: true }
        ]
    }
});

export default onboard;