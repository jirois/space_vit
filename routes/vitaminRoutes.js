const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ErrorApp = require('../utils/ErrorApp')
const { 
     renderIndex,
     renderNewForm, 
     renderVitamin,
     renderUpdateForm,
     renderUpdate,
     renderCreate,
     renderDelete
    } = require('../controller/vitaminController')
const { vitaminSchema } = require('../validate/schema')



const validateVitamin = (req, res, next) => {
    const { error } = vitaminSchema.validate(req.body)
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new ErrorApp(message, 500)
    } else {
    next()
    }
}

router.get('/', catchAsync( renderIndex ))

router.get('/new', renderNewForm)

router.get('/:id', catchAsync(renderVitamin))

router.post('/create',  catchAsync( renderCreate))

router.get('/:id/edit', catchAsync(renderUpdateForm))

router.put('/:id',  catchAsync(renderUpdate))

router.delete('/:id', catchAsync(renderDelete))

module.exports = router;