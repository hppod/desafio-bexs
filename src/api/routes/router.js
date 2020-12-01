const express = require('express')
const BestFlightController = require('../controller/best-flight')

const router = express.Router()

router.get('/bestFlight/:fromTo', BestFlightController.getBestFlight)
router.post('/addNewRoute', BestFlightController.addNewRoute)

module.exports = router