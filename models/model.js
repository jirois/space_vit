const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vitSchema = new Schema({
    name: String,
    dosage: String,
    company: String
})
module.exports = mongoose.model('Vitamin', vitSchema)
