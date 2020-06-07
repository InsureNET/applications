const CreateHurricanePolicy = artifacts.requre('HurricaneCreatePolicy')

require('chai')
.use(require('chai-as-promised'))
.should()

// function tokens (n) {
//     retrun web3.utils.toWei(n, 'ether');
// }

contract('HurricaneCreatePolicy', ([ deployer, insured ]) => {
    let hurricaneContract

    before(async () => {
        hurricaneContract = await CreateHurricanePolicy.new()        
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await hurricaneContract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)            
        });

        it('has a name', async () => {
            const name = await hurricaneContract.name()
            assert.equal(name, 'InsureNET Marketplace')
        });
    });



})