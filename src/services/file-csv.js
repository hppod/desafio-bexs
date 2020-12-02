const { exception } = require('console')
const fs = require('fs')
const readline = require('readline')

const load = (file) => {
    try {
        const interface = readline.createInterface({
            input: readPath(file),
            console: false
        })
    } catch (err) {
        return err
    } finally {
        return true
    }

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

const addFlight = (flight, file = 'input-routes.csv') => {
    try {
        fs.appendFileSync(file, '\n' + flight, 'utf8')
    } catch (err) {
        return err
    } finally {
        return true
    }

}

module.exports = { load, addFlight }
