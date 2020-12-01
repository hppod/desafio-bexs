const { bestFlight } = require('./../../services/best-flight')

class BestFlight {

    getBestFlight(req, res) {
        const [to, from] = req.params['toFrom'].split('-')
        const { bestRoute, price } = bestFlight(to, from)

        res.status(200).send(`The best route is ${bestRoute} and the price is ${price}`)
    }

}

module.exports = new BestFlight()