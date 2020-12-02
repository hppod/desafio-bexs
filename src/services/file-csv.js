const fs = require('fs')
const readline = require('readline')

const load = (file) => {
    const interface = readline.createInterface({
        input: readPath(file),
        console: false
    })

    return interface

}

const readPath = (path) => {
    return fs.createReadStream(path)
        .on('error', (err) => {
            if (err.message.includes('ENOENT')) {
                console.log('The directions file entered is not a valid file. Please enter a valid file')
                process.exit(0)
            } else {
                console.log(err)
                process.exit(0)
            }
        })
}

const addFlight = (flight) => {
    return fs.appendFileSync('input-routes.csv', '\n' + flight, 'utf8')
}

module.exports = { load, addFlight }