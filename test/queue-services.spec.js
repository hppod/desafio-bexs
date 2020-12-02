const chai = require('chai')
const Queue = require('./../src/services/queue')

describe('Queue Services Functions', () => {
    it('addToQueue', () => {
        const queue = new Queue()
        queue.addToQueue(['GRU', 0])
        chai.expect(queue.range.length).to.equal(1)
    })

    it('removeFirstFromQueue', () => {
        const queue = new Queue()
        queue.addToQueue(['GRU', 0])
        queue.addToQueue(['VCP', 10])
        chai.expect(queue.removeFirstFromQueue()).to.eql(['GRU', 0])
    })

    it('checkIfIsEmpty', () => {
        const queue = new Queue()
        chai.expect(queue.checkIfIsEmpty()).to.equal(true)
        
        queue.addToQueue(['GRU', 0])
        chai.expect(queue.checkIfIsEmpty()).to.equal(false)
    })
})