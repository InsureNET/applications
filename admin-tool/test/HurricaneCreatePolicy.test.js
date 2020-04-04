const CreateHurricanePolicy = artifacts.requre('HurricaneCreatePolicy')

require('chai')
.use(require('chai-as-promised'))
.should()

// function tokens (n) {
//     retrun web3.utils.toWei(n, 'ether');
// }

contract('HurricanePolicyCreator', ([ deployer, insured ]) => {
    let hurricaneContract

    before(async () => {
        hurricaneContract = await CreateHurricanePolicy.new()
        
    })


})