const fs = require('fs')
const Fork = require('./fork')

const bestFlight = (to, from) => {
    const flights = buildFlightList(fs.readFileSync('input-routes.csv', 'utf8').split('\n'))
    const fork = new Fork()

    flights.forEach((flight) => {
        fork.addStartPoints(flight[0])
        fork.addStartPoints(flight[1])
    })

    flights.forEach((flight) => {
        fork.addFinalPoints(flight[0], flight[1], parseInt(flight[2]))
    })

    return fork.findBetterWay(to, from)
}

const buildFlightList = (routes) => {
    return routes.reduce((flights, route) => {
        const point = route.split(',')

        if (!point.length < 3) {
            flights.push(point)
        }

        return flights
    }, [])
}

module.exports = { bestFlight }