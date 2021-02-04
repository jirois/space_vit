const Constituent = require('../models/composite')
const VitaModel = require('../models/model')

module.exports.renderNewConForm = async (req, res) => {
    const vitamin = await VitaModel.findById(req.params.id)
    res.render('constituent/new', {vitamin})
}

module.exports.createNewConstituent= async (req, res) => {
    const {id} = req.params;
    const vitamin = await VitaModel.findById(id)
    const {constituent, strength, eqv} = req.body
    const constituents = new Constituent({ constituent, strength, eqv})
    vitamin.constituents.push(constituents)
    await constituents.save()
    await vitamin.save()
    // console.log(vitamin)
    res.redirect(`/vitamins/${id}`)
}

module.exports.deleteConstituent = async (req, res) => {
    const { id, constId } = req.params;
    await VitaModel.findOneAndUpdate(id, {$pull: {constituents: constId}})
    await Constituent.findByIdAndDelete(constId)
    res.redirect(`/vitamins/${id}`)
}