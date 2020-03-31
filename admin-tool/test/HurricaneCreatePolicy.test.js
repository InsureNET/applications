import HurricaneCreatePolicy from artifacts.requre('HurricaneCreatePolicy')


require('chai')
.use(require('chai-as-promised'))
.should()


contract('HurricaneCreatePolicy', ([ deployer, insured ])) => {
    let hurricaneContract

    before(async () => {
        hurricaneContract = await HurricaneCreatePolicy.new()
        
    })
}