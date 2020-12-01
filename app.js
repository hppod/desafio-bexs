const inquirer = require('inquirer')
const arguments = process.argv[2]
const { upload } = require('./src/services/file-uploader')
const { bestFlight, checkIfThePointsExist } = require('./src/services/best-flight')

if (arguments === undefined) {
    console.log('It is necessary to inform the file path of the routes to be loaded.')
    process.exit(0)
} else {
    upload(arguments)
}

(async () => {
    const route = await inquirer.prompt([
        {
            name: 'destinationFlight',
            type: 'input',
            message: 'Enter the desired route in the FROM-TO format',
            default: 'GRU-CDG',
            validate: (value) => {
                if (value.split('-').length !== 2) {
                    return 'The route is out of the correct format. Enter the route in the FROM-TO format'
                }
                return true
            }
        }
    ])

    const [from, to] = route['destinationFlight'].split('-')
    const { hasFrom, hasTo } = checkIfThePointsExist(from, to)
    let result = null

    if (hasFrom && hasTo) {
        const { bestRoute, price } = bestFlight(from, to)
        result = `The best route is ${bestRoute} and the price is ${price}`
    } else if (!hasFrom && hasTo) {
        result = `We did not find the starting point '${from}' in our records. It is not possible to calculate the smallest value`
    } else if (hasFrom && !hasTo) {
        result = `We did not find the destination '${to}' in our records. It is not possible to calculate the smallest value`
    } else {
        result = `We did not find the starting point '${from}' or the destination '$ {to}' in our records. It is not possible to calculate the smallest value`
    }

    console.log(result)

})() 