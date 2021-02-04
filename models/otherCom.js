const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OtherConSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
    
})
module.exports = mongoose.model('Other', OtherConSchema)