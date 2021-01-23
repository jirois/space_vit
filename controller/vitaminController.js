module.exports.renderIndex = async (req, res) => {
    const vitamins = await VitaModel.find()
    res.render('vitamin/index', {vitamins})
}