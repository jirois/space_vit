const Joi = require('joi')

const vitaminSchema = Joi.object({
    name: Joi.string().required,
    dosage: Joi.string().required
}).required

module.exports = vitaminSchema