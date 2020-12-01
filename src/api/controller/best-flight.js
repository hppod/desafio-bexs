const { bestFlight } = require('./../../services/best-flight')
const fs = require('fs')

class BestFlight {

    getBestFlight(req, res) {
        const [to, from] = req.params['toFrom'].split('-')
        const { bestRoute, price } = bestFlight(to, from)

        res.status(200).send(`The best route is ${bestRoute} and the price is ${price}`)
    }

    addNewRoute(req, res) {
        const body = req.body
        const hasError = new Array()

        body.forEach((item, index) => {

            if (item['to'] === undefined) {
                hasError.push(`It is necessary to inform the TO key of the index object ${index}`)
            }

            if (item['from'] === undefined) {
                hasError.push(`It is necessary to inform the FROM key of the index object ${index}`)
            }

            if (item['value'] === undefined) {
                hasError.push(`It is necessary to inform the VALUE key of the index object ${index}`)
            }

            const route = `${item['to']},${item['from']},${item['value']}`

            if (!route.includes('undefined')) {
                fs.appendFileSync('input-routes.csv', '\n' + route, 'utf8')
            }
        })

        if (hasError.length === 0) {
            res.status(201).send(`${body.length} new routes added`)
        } else {
            res.status(400).json({
                message: "There are errors in the request body. Some objects may not have been inserted correctly",
                errors: hasError
            })
        }
    }

}

module.exports = new BestFlight()