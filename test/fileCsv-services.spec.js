const chai = require('chai')
const http = require('chai-http')
const subset = require('chai-subset')
const fileCsv = require('../src/services/file-csv')

chai.use(http)
chai.use(subset)

describe('File CSV Services Functions', () => {
    it('load', () => {
        const loaded = fileCsv.load('input-test.csv')
        chai.expect(loaded).to.equal(true)
    })

    it('addNewRoute', () => {
        const route = fileCsv.addFlight('VCP,GRU,10', 'input-test.csv')
        chai.expect(route).to.equal(true)
    })

})