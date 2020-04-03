import HurricaneCreatePolicy from artifacts.requre('HurricaneCreatePolicy');
//import web3 from 'web3';


require('chai')
.use(require('chai-as-promised'))
.should();

// function tokens (n) {
//     retrun web3.utils.toWei(n, 'ether');
// }

contract('HurricanePolicyCreator', ([ deployer, insured ]) => {
    let hurricaneContract

    before(async () => {
        hurricaneContract = await HurricaneCreatePolicy.new()
        
    })


})