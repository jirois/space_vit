const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ErrorApp = require('../utils/ErrorApp')
const VitaModel = require('../models/model')
const { 
     renderIndex,
     renderNewForm, 
     renderVitamin,
     renderUpdateForm,
     renderUpdate
    } = require('../controller/vitaminController')
const { vitaminSchema } = require('../validate/schema')



const validateVitamin = (req, res, next) => {
    const { error } = vitaminSchema.validate(req.body)
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new ErrorApp(message, 400)
    } else {
    next()
    }
}

router.get('/', catchAsync( renderIndex ))

router.get('/new', renderNewForm)

router.get('/:id', catchAsync(renderVitamin))

router.post('/create', validateVitamin, catchAsync(async (req, res) => {
    const body = req.body;
    const newVit = new VitaModel(body)
    await newVit.save()
    res.redirect(`/vitamins/${newVit.id}`)

}))

router.get('/:id/edit', catchAsync(renderUpdateForm))

router.put('/:id', validateVitamin, catchAsync(renderUpdate))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findByIdAndDelete(id)
    res.redirect(`/vitamins`)
}))

module.exports = router;