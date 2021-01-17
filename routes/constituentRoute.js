const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync')
const Constituent = require('../models/composite')
const VitaModel = require('../models/model')


router.get('/new',catchAsync(async (req, res) => {
    const vitamin = await VitaModel.findById(req.params.id)
    res.render('constituent/new', {vitamin})
}))

router.post('/', catchAsync(async (req, res) => {
    const {id} = req.params;
    const vitamin = await VitaModel.findById(id)
    const {constituent, strength, eqv} = req.body
    const constituents = new Constituent({ constituent, strength, eqv})
    vitamin.constituents.push(constituents)
    await constituents.save()
    await vitamin.save()
    // console.log(vitamin)
    res.redirect(`/vitamins/${id}`)

}))

router.delete('/:constId', catchAsync(async (req, res) => {
    const { id, constId } = req.params;
    await VitaModel.findOneAndUpdate(id, {$pull: {constituents: constId}})
    await Constituent.findByIdAndDelete(constId)
    res.redirect(`/vitamins/${id}`)
}))

module.exports = router;