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
                hasError.push(`É necessário informar a chave TO do objeto do indice ${index}`)
            }

            if (item['from'] === undefined) {
                hasError.push(`É necessário informar a chave FROM do objeto do indice ${index}`)
            }

            if (item['value'] === undefined) {
                hasError.push(`É necessário informar a chave VALUE do objeto do indice ${index}`)
            }

            const route = `${item['to']},${item['from']},${item['value']}`

            if (route.split(',').length === 3 && !route.includes('undefined')) {
                fs.appendFileSync('input-routes.csv', '\n' + route, 'utf8')
            }
        })

        if (hasError.length === 0) {
            res.status(201).send(`${body.length} new routes added`)
        } else {
            res.status(400).json({
                message: "Há erros no corpo da requisição. Alguns objetos podem não ter sido inseridos corretamente",
                errors: hasError
            })
        }
    }

}

module.exports = new BestFlight()