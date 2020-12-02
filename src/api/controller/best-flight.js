const { bestFlight, checkIfThePointsExist } = require('./../../services/best-flight')
const { addFlight } = require('./../../services/file-csv')

class BestFlight {

    getBestFlight(req, res) {
        const [from, to] = req.params['fromTo'].split('-')
        const { hasFrom, hasTo } = checkIfThePointsExist(from, to)
        let response = null

        if (hasFrom && hasTo) {
            const { bestRoute, price } = bestFlight(from, to)

            if (bestRoute !== undefined && price > 0) {
                response = `The best route is ${bestRoute} and the price is ${price}`
            } else {
                response = `We didn't find a route to ${from}-${to}`
            }

        } else if (!hasFrom && hasTo) {
            response = `We did not find the starting point '${from}' in our records. It is not possible to calculate the smallest value`
        } else if (hasFrom && !hasTo) {
            response = `We did not find the destination '${to}' in our records. It is not possible to calculate the smallest value`
        } else {
            response = `We did not find the starting point '${from}' or the destination '${to}' in our records. It is not possible to calculate the smallest value`
        }

        res.status(200).send(response)
    }

    addNewRoute(req, res) {
        const body = req.body
        const hasError = new Array()

        body.forEach((item, index) => {

            if (item['from'] === undefined) {
                hasError.push(`It is necessary to inform the FROM key of the index object ${index}`)
            }

            if (item['to'] === undefined) {
                hasError.push(`It is necessary to inform the TO key of the index object ${index}`)
            }

            if (item['value'] === undefined) {
                hasError.push(`It is necessary to inform the VALUE key of the index object ${index}`)
            }

            const route = `${item['from']},${item['to']},${item['value']}`

            if (!route.includes('undefined')) {
                console.log(addFlight(route))
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