const dosageForm = ['Tablet','Injection','Syrup', 'Suspension','Drop', 'Capsule', 'Caplet']

module.exports.renderIndex = async (req, res) => {
    const vitamins = await VitaModel.find()
    res.render('vitamin/index', {vitamins})
}
module.exports.renderNewForm= (req, res) => {
    res.render('vitamin/new', {dosageForm})
}
module.exports.renderVitamin = async (req, res) => {
    const { id } = req.params
    const vitamin = await VitaModel.findById(id).populate('constituents')
    console.log(vitamin)
    res.render('vitamin/show', { vitamin })
}
module.exports.renderUpdateForm = async (req, res) => {
    const { id } = req.params;
    const vitamin = await VitaModel.findById(id)
    res.render('vitamin/edit', {vitamin, dosageForm})
}
module.exports.renderCreate = async (req, res) => {
    const body = req.body;
    const newVit = new VitaModel(body)
    await newVit.save()
    res.redirect(`/vitamins/${newVit.id}`)

}
module.exports.renderUpdate = async (req, res) => {
    const { id } = req.params
    if(!id) throw new ErrorApp("Not the id boddy", 401)
    const body = req.body;
    const vitamin = await VitaModel.findByIdAndUpdate(id, body, {runValidators: true, new: true})
    res.redirect(`/vitamins/${vitamin.id}`)
}