const mongoose = require('mongoose')
const Schema = mongoose.Schema

const constituentSchema = new Schema({
    constituent: {
        type: String,
        require: [true, 'Name required']
    },
    strength: {
        type: String,
        require: true
    },
    eqv: {
        type: String,
        default: '--'
    }
})
module.exports = mongoose.model('Constituent', constituentSchema)