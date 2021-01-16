const mongoose = require('mongoose')
const express = require('express')
const {port, uri} = require('./config')
const path = require('path')
const app = express()
const VitaModel = require('./models/model')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const ErrorApp = require('./utils/ErrorApp')
const catchAsync = require('./utils/catchAsync')
const Constituent = require('./models/composite')

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
app.use(methodOverride('_method'))

const dosageForm = ['Tablet','Injection','Syrup', 'Suspension','Drop', 'Capsule']
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/vitamins', catchAsync(async (req, res) => {
    const vitamins = await VitaModel.find()
    res.render('vitamin/index', {vitamins})
}))

app.get('/vitamins/new', (req, res) => {
    res.render('vitamin/new', {dosageForm})
})

app.get('/vitamins/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findById(id).populate('constituents')
    console.log(vitamin)
    res.render('vitamin/show', { vitamin })
}))

app.post('/vitamins/create', catchAsync(async (req, res) => {
    const body = req.body;
    const newVit = new VitaModel(body)
    await newVit.save()
    res.redirect(`/vitamins/${newVit.id}`)

}))

app.get('/vitamins/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const vitamin = await VitaModel.findById(id)
    res.render('vitamin/edit', {vitamin, dosageForm})
}))

app.put('/vitamins/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    if(!id) throw new ErrorApp("Not the id boddy", 401)
    const body = req.body;
    const vitamin = await VitaModel.findByIdAndUpdate(id, body, {runValidators: true, new: true})
    res.redirect(`/vitamins/${vitamin.id}`)
}))

app.delete('/vitamins/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findByIdAndDelete(id)
    res.redirect(`/vitamins`)
}))



app.get('/vitamins/:id/constituent/new', async (req, res) => {
    const vitamin = await VitaModel.findById(req.params.id)
    res.render('constituent/new', {vitamin})
})

app.post('/vitamins/:id/constituent', async (req, res) => {
    const {id} = req.params;
    const vitamin = await VitaModel.findById(id)
    const {constituent, strength, eqv} = req.body
    const constituents = new Constituent({ constituent, strength, eqv})
    vitamin.constituents.push(constituents)
    await constituents.save()
    await vitamin.save()
    // console.log(vitamin)
    res.redirect(`/vitamins/${id}`)

})



app.all('*', (req, res, next) => {
    next(new ErrorApp('Page Not Found!', 404))
})
app.use((err, req, res, next) => {
    const {message='Not the page you are looking for', statusCode=500} = err
    res.status(statusCode).send(message)
})

app.listen(port, () => {
    console.log(`serving the from port ${port}`)
})