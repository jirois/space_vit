const mongoose = require('mongoose')
const express = require('express')
const {port, uri} = require('./config')
const path = require('path')
const app = express()
const VitaModel = require('./models/model')
const ejsMate = require('ejs-mate')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

mongoose.connect(uri, options)
.then(() => console.log('Connected!'))
.catch((err)=> console.log(err))

app.engine('ejs', ejsMate)
app.set('views',  path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/vitamins', async (req, res) => {
    const vitamins = await VitaModel.find()
    res.render('vitamin/index', {vitamins})
})
app.get('/vitamins/new', (req, res) => {
    res.render('vitamin/new')
})

app.get('/vitamins/:id', async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findById(id)
    res.render('vitamin/show', { vitamin })
})
app.post('/vitamins/create', async (req, res) => {
    const body = req.body;
    const newVit = new VitaModel(body)
    await newVit.save()
    res.redirect(`/vitamins/${newVit.id}`)

})
app.listen(port, () => {
    console.log(`serving the from port ${port}`)
})