const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync')
const {
    renderNewConForm,
    createNewConstituent,
    deleteConstituent
 } 
= require('../controller/constituentController')


router.get('/new',catchAsync(renderNewConForm))

router.post('/', catchAsync(createNewConstituent))

router.delete('/:constId', catchAsync(deleteConstituent))

module.exports = router;