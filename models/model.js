const mongoose = require('mongoose')
const Constituent = require('./composite')
const Other = require('./otherCom.js')

const Schema = mongoose.Schema


const vitSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name required']
    },
    dosage: {
        type: String,
        enum: ['Drop', 'Tablet', 'Syrup', 'Suspension', 'Injection', 'Capsule', 'Caplet']
    },
    company: {
        type: String
    },
    constituents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Constituent'
        }
    ],
    others: [
        {
           type: Schema.Types.ObjectId,
           ref: 'Other'
        }
    ]
})

vitSchema.post('findOneAndDelete', async (vita) => {
    if (vita.constituents.length){
        const res = await Constituent.deleteMany({_id: {$in : vita.constituents} })
        console.log(res)
    }
})

vitSchema.post('findOneAndDelete', async (vita) => {
    if (vita.others.length){
        const res = await Other.deleteMany({_id: {$in: vita.others} })
        console.log(res)
    }
})
module.exports = mongoose.model('Vitamin', vitSchema)
