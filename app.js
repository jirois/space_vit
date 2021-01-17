const mongoose = require('mongoose')
const express = require('express')
const {port, uri} = require('./config')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const ErrorApp = require('./utils/ErrorApp')
const VitaminRoutes = require('./routes/vitaminRoutes')
const ConstituentRoutes = require('./routes/constituentRoute')

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
app.use('/vitamins', VitaminRoutes)
app.use('/vitamins/:id/constituent', ConstituentRoutes)


app.get('/', (req, res) => {
    res.render('index')
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