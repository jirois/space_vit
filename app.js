const mongoose = require('mongoose')
const express = require('express')
const {port, uri} = require('./config')
const app = express()

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

mongoose.connect(uri, options)
.then(() => console.log('Connected!'))
.catch((err)=> console.log(err))

app.get('/', (req, res) => {
    res.send("Helo there")
})
app.listen(port, () => {
    console.log(`serving the from port ${port}`)
})