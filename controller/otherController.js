const Others = require('../models/otherCom')
const VitaModel = require('../models/model')

module.exports.renderOtherForm = async (req, res) => {
    const vitamin = await VitaModel.findById(req.params.id)
    res.render('others/new', {vitamin})
}

module.exports.createNewOther = async (req, res) => {
    const {id} = req.params;
    const vitamin = await VitaModel.findById(id)
    console.log(req.body)
    const {name, description} = req.body
    const others = new Others({ name, description})
    vitamin.others.push(others)
    await others.save()
    await vitamin.save()
    console.log(vitamin)
    res.redirect(`/vitamins/${id}`)
}

module.exports.deleteOther = async (req, res) => {
    const { id, otherId } = req.params;
    await VitaModel.findOneAndUpdate(id, {$pull: {others: otherId}})
    await Constituent.findByIdAndDelete(otherId)
    res.redirect(`/vitamins/${id}`)
}