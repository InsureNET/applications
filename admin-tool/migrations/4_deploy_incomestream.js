const IncomeStream = artifacts.require('IncomeStream');


module.exports = async function(deployer) {
    
    /**
     * @dev Interface Deployments
     */
    await deployer.deploy(IncomeStream)
    const incomeStream = await IncomeStream.deployed()


} 