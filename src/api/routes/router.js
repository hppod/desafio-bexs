const express = require('express')
const BestFlightController = require('../controller/best-flight')

const router = express.Router()

router.get('/bestFlight/:toFrom', BestFlightController.getBestFlight)

module.exports = router