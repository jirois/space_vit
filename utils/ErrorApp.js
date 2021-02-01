class ErrorApp extends Error{
    constructor(message, statusCode){
        super()
        this.messagecode = message
        this.statusCode = statusCode
    }
}

module.exports = ErrorApp