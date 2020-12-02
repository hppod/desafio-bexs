const chai = require('chai')
const subset = require('chai-subset')
const Fork = require('../src/services/fork')

chai.use(subset)

const addStartPointsAdjacents_MOCK = {
    GRU: GRU => GRU
}

const addFinalPointsAdjacents_MOCK = {
    GRU: [{ point: "VCP", value: 10 }],
    VCP: [{ point: "GRU", value: 10 }]
}

const findBetterWaySuccess_MOCK = {
    bestRoute: ["GRU", "VCP"],
    price: 10
}

const findBetterWayError_MOCK = {
    bestRoute: undefined,
    price: 0
}

describe('Fork Services Functions', () => {
    it('addStartPoints', () => {
        const fork = new Fork()
        fork.addStartPoints('GRU')
        chai.expect(fork.points.length).to.equal(1)
        chai.expect(fork.adjacentPoints).to.containSubset(addStartPointsAdjacents_MOCK)
    })

    it('addFinalPoints', () => {
        const fork = new Fork()
        fork.addStartPoints('GRU')
        fork.addStartPoints('VCP')
        fork.addFinalPoints('GRU', 'VCP', 10)
        chai.expect(fork.points.length).to.equal(2)
        chai.expect(fork.adjacentPoints).to.containSubset(addFinalPointsAdjacents_MOCK)
    })

    it('findBetterWay_Success', () => {
        const fork = new Fork()
        fork.addStartPoints('GRU')
        fork.addStartPoints('VCP')
        fork.addFinalPoints('GRU', 'VCP', 10)
        chai.expect(fork.findBetterWay('GRU', 'VCP')).to.containSubset(findBetterWaySuccess_MOCK)
    })

    it('findBetterWay_Error', () => {
        const fork = new Fork()
        fork.addStartPoints('GRU')
        fork.addStartPoints('VCP')
        fork.addFinalPoints('GRU', 'VCP', 10)
        chai.expect(fork.findBetterWay('GRU', 'LAX')).to.containSubset(findBetterWayError_MOCK)
    })
})