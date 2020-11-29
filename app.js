const inquirer = require('inquirer')
const arguments = process.argv[2]
const { upload } = require('./app/services/file-uploader')

if (arguments === undefined) {
    console.log('Necessário informar o caminho do arquivo das rotas a ser carregado.')
    process.exit(0)
} else {
    upload(arguments)
}

(async () => {
    const route = await inquirer.prompt([
        {
            name: 'destinationFlight',
            type: 'input',
            message: 'Insira a rota desejada no formato DE-PARA',
            default: 'GRU-CDG',
            validate: (value) => {
                if (value.split('-').length !== 2) {
                    return 'A rota está fora do formato correto. Insira a rota no formato DE-PARA'
                }
                return true
            }
        }
    ])

    const [to, from] = route['destinationFlight'].split('-')

    console.log(to, from)

})() 