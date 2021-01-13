const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Helo there")
})

app.listen(2000, () => {
    console.log(`serving the from port 2000`)
})