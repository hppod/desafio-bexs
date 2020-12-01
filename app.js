const inquirer = require('inquirer')
const arguments = process.argv[2]
const { upload } = require('./src/services/file-uploader')
const { bestFlight } = require('./src/services/best-flight')

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

    const [to, from] = route['destinationFlight'].split('-')

    const { bestRoute, price } = bestFlight(to, from)

    console.log(`The best route is ${bestRoute} and the price is ${price}`)

})() 