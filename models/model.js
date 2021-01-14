const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vitSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name required']
    },
    dosage: {
        type: String,
        enum: ['Drop', 'Tablet', 'Syrup', 'Suspension', 'Injection']
    },
    company: {
        type: String
    }
})
module.exports = mongoose.model('Vitamin', vitSchema)
