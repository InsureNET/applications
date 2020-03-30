const Marketplace = artifacts.require('./Marketplace.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Marketplace', ([ deployer, seller, buyer ]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)            
        });

        it('has a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'InsureNET Marketplace')
        });
    });

    describe('policies', async () => {
        let result, policyCount

        before(async () => {
            result = await marketplace.createPolicy(
                'WP5000100',
                web3.utils.toWei('5', 'ether'),
                web3.utils.toWei('.5', 'ether')
            )

            policyCount = await marketplace.policyCount();
        });

        it('creates policies', async () => {
            const event = result.logs[0].args
            console.log(result.logs)
            assert.equal(event.id.toNumber(), policyCount.toNumber(), 'id is correct')
            assert.equal(event.name, web3.utils.toWei('5', 'ether'), 'amount is correct')

        })
    });
    
    


});