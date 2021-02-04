const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync')
const {
    renderOtherForm,
    createNewOther
} = require('../controller/otherController')

router.get('/new',catchAsync(renderOtherForm))

router.post('/', catchAsync(createNewOther) )

module.exports = router