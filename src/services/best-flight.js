const fs = require('fs')
const Fork = require('./fork')

const bestFlight = ((to, from, file = 'input-routes.csv') => {
    const flights = buildFlightList(fs.readFileSync(file, 'utf8').split('\n'))
    const fork = new Fork()

    flights.forEach((flight) => {
        fork.addStartPoints(flight[0])
        fork.addStartPoints(flight[1])
    })

    flights.forEach((flight) => {
        fork.addFinalPoints(flight[0], flight[1], parseInt(flight[2]))
    })

    return fork.findBetterWay(to, from)
})

const buildFlightList = (routes) => {
    return routes.reduce((flights, route) => {
        const point = route.split(',')

        if (!point.length < 3) {
            flights.push(point)
        }

        return flights
    }, [])
}

const checkIfThePointsExist = (from, to, file = 'input-routes.csv') => {
    let hasFrom = false
    let hasTo = false

    const flights = buildFlightList(fs.readFileSync(file, 'utf8').split('\n'))

    flights.filter(a => {
        const flightsFrom = a[0]
        const flightsTo = a[1]

        if (flightsFrom === from) {
            hasFrom = true
        }

        if (flightsTo === to) {
            hasTo = true
        }

    })

    return { hasFrom, hasTo }
}

module.exports = { bestFlight, checkIfThePointsExist }