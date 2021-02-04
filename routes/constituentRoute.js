const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync')
const {
    renderNewConForm,
    createNewConstituent,
    showConstituent,
    deleteConstituent
 } 
= require('../controller/constituentController')


router.get('/new',catchAsync(renderNewConForm))

router.get('/:constId', catchAsync(showConstituent))


router.post('/', catchAsync(createNewConstituent))

router.delete('/:constId', catchAsync(deleteConstituent))

module.exports = router;