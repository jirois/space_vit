const mongoose = require('mongoose')
const {uri} = require('./config')
const data = require('./Book1')
const VitaModel = require('./models/model')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

mongoose.connect('mongodb+srv://omasajiri:connectapp@fcc-cluster.g0l0u.mongodb.net/spaceVit?retryWrites=true&w=majority', options)

const vitamin = data.filter(el => el["therapeutic _class"] === "Multivitamin/Mineral");

const vitamins = vitamin.map(el => {
    let name = el.brand_name;
    let dosage = el.dosage_form
    let company = el.company
    return { name, dosage, company}
})

const seed = () => {
    VitaModel.deleteMany({})

    VitaModel.insertMany(vitamins)
    .then(data => console.log(data))
}
seed()