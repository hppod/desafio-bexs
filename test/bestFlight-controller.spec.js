const chai = require('chai')
const subset = require('chai-subset')
const http = require('chai-http')
const rest = require('./../server')

chai.use(subset)
chai.use(http)

describe('REST Test', () => {
    it('/api/addNewRoute [POST] - Success', () => {
        chai.request(rest.server)
            .post('/api/addNewRoute')
            .send([
                {
                    "from": "VCP",
                    "to": "RAO",
                    "value": 9
                }
            ])
            .end((err, res) => {
                const objResponse = { message: "1 new routes added" }
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(201)
                chai.expect(res.body).to.containSubset(objResponse)
            })
    })

    it('/api/addNewRoute [POST] - Error', () => {
        chai.request(rest.server)
            .post('/api/addNewRoute')
            .send([
                {
                    "to": "RAO",
                    "value": 9
                }
            ])
            .end((err, res) => {
                const objResponse = {
                    message: "There are errors in the request body. Some objects may not have been inserted correctly",
                    errors: [
                        'It is necessary to inform the FROM key of the index object 0'
                    ]
                }
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(400)
                chai.expect(res.body).to.containSubset(objResponse)
            })
    })

    it('/api/bestFlight/GRU-CDG [GET] - Valid', () => {
        chai.request(rest.server)
            .get('/api/bestFlight/GRU-CDG')
            .end((err, res) => {
                const objResponse = { message: "The best route is GRU,BRC,SCL,ORL,CDG and the price is 22" }
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(200)
                chai.expect(res.body).to.containSubset(objResponse)
            })

    })

    it('/api/bestFlight/LAX-PAR [GET] - Invalid', () => {
        chai.request(rest.server)
            .get('/api/bestFlight/LAX-PAR')
            .end((err, res) => {
                const objResponse = { message: "We did not find the starting point 'LAX' or the destination 'PAR' in our records. It is not possible to calculate the smallest value" }
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(200)
                chai.expect(res.body).to.containSubset(objResponse)
            })

    })
})