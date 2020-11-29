const fs = require('fs')
const readline = require('readline')

const upload = (file) => {
    const interface = readline.createInterface({
        input: readPath(file),
        console: false
    })

    interface.on('line', (line) => {
        if (line.split(',').length === 3) {
            fs.appendFileSync('input-routes.csv', '\n' + line, 'utf8')
        }
    })
}

const readPath = (path) => {
    return fs.createReadStream(path)
        .on('error', (err) => {
            if (err.message.includes('ENOENT')) {
                console.log('O arquivo de rotas informado não é um arquivo válido. Por favor informe um arquivo válido')
                process.exit(0)
            } else {
                console.log(err)
                process.exit(0)
            }
        })
}

module.exports = { upload }

