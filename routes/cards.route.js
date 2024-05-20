const express = require('express')
const router = express.Router()
const {getCard, createCard, editCard, updateCard, deleteCard, getReview, sendCard, updateScore} = require('../controllers/cards.controllers')
const ensureAuth = require('../middlewares/auth')

//@des Home page
//@route Get /
router.get('/', getCard)

//@des add new card
//@route post /addCard
router.post('/addCard', createCard)

//@des review
//@route get /review
router.get('/review', getReview)

//@des edit card
//@route Get /edit/id
router.get('/edit/:id', editCard)

//@des update card
//@route put /updateCard/id
router.put('/updateCard/:id', updateCard)

//@des update card score
//@route put /updateScore/id
router.put('/updateScore', updateScore)

//@des delete card
//@route delete /deleteCard/id
router.delete('/deleteCard/:id', deleteCard)

module.exports = router
