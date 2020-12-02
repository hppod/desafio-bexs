const chai = require('chai')
const subset = require('chai-subset')
const bestFlight = require('./../src/services/best-flight')

chai.use(subset)

const findBetterWaySuccess_MOCK = {
    bestRoute: ["GRU", "VCP"],
    price: 10
}

const findBetterWayError_MOCK = {
    bestRoute: undefined,
    price: 0
}

const checkIfThePointsExist_Success = {
    hasFrom: true,
    hasTo: true
}

const checkIfThePointsExist_Error = {
    hasFrom: true,
    hasTo: false
}

describe('Best Flight Services Functions', () => {
    it('bestFlight_Success', () => {
        const bf = bestFlight.bestFlight('GRU', 'VCP', 'input-test.csv')
        chai.expect(bf).to.containSubset(findBetterWaySuccess_MOCK)
    })

    it('bestFlight_Error', () => {
        const bf = bestFlight.bestFlight('GRU', 'LAX', 'input-test.csv')
        chai.expect(bf).to.containSubset(findBetterWayError_MOCK)
    })

    it('checkIfThePointsExist_Success', () => {
        const bf = bestFlight.checkIfThePointsExist('GRU', 'VCP', 'input-test.csv')
        chai.expect(bf).to.containSubset(checkIfThePointsExist_Success)
    })

    it('checkIfThePointsExist_Error', () => {
        const bf = bestFlight.checkIfThePointsExist('GRU', 'LAX', 'input-test.csv')
        chai.expect(bf).to.containSubset(checkIfThePointsExist_Error)
    })
})
