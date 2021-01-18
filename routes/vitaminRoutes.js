const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ErrorApp = require('../utils/ErrorApp')
const VitaModel = require('../models/model')
const { vitaminSchema } = require('../validate/schema')

const dosageForm = ['Tablet','Injection','Syrup', 'Suspension','Drop', 'Capsule', 'Caplet']

const validateVitamin = (req, res, next) => {
    const { error } = vitaminSchema.validate(req.body)
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new ErrorApp(message, 400)
    } else {
    next()
    }
}

router.get('/', catchAsync(async (req, res) => {
    const vitamins = await VitaModel.find()
    res.render('vitamin/index', {vitamins})
}))

router.get('/new', (req, res) => {
    res.render('vitamin/new', {dosageForm})
})

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findById(id).populate('constituents')
    console.log(vitamin)
    res.render('vitamin/show', { vitamin })
}))

router.post('/create', validateVitamin, catchAsync(async (req, res) => {
    const body = req.body;
    const newVit = new VitaModel(body)
    await newVit.save()
    res.redirect(`/vitamins/${newVit.id}`)

}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const vitamin = await VitaModel.findById(id)
    res.render('vitamin/edit', {vitamin, dosageForm})
}))

router.put('/:id', validateVitamin, catchAsync(async (req, res) => {
    const { id } = req.params
    if(!id) throw new ErrorApp("Not the id boddy", 401)
    const body = req.body;
    const vitamin = await VitaModel.findByIdAndUpdate(id, body, {runValidators: true, new: true})
    res.redirect(`/vitamins/${vitamin.id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findByIdAndDelete(id)
    res.redirect(`/vitamins`)
}))

module.exports = router;