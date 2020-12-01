const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.API_PORT || 3000

const routes = require('./src/api/routes/router')
const errorHandler = require('./src/api/controller/error-handler')

const server = express()

server.use(bodyParser.json({ type: 'application/json' }))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.text())

server.use(cors())

server.use('/api', routes)

server.use('*', (req, res) => errorHandler.errorHandlerURL(req, res))

server.listen(PORT, () => console.log(`API listening on port ${PORT}`))

module.exports = server