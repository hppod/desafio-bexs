class ErrorHandler {

    errorHandlerURL(req, res) {
        if (req.originalUrl.includes('/api/bestFlight')) {
            res.status(400).send('It is necessary to inform the parameter toFrom in the route')
        }
    }

}

module.exports = new ErrorHandler()