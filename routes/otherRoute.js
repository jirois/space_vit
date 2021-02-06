const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync')
const {
    renderOtherForm,
    createNewOther, 
    showOtherConst,
    deleteOther
} = require('../controller/otherController')

router.get('/new',catchAsync(renderOtherForm))
router.get('/:otherId', catchAsync(showOtherConst))

router.post('/', catchAsync(createNewOther) )
router.delete('/:otherId', catchAsync(deleteOther))


module.exports = router