const express = require('express')
const router = express.Router()
const {getCard, createCard, editCard, updateCard, deleteCard, getReview, sendCard } = require('../controllers/cards.controllers')
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

//@des cards api
//@route get /review/cards
router.get('/review/cards', sendCard)

//@des edit card
//@route Get /edit/id
router.get('/edit/:id', editCard)

//@des update card
//@route put /updateCard/id
router.put('/updateCard/:id', updateCard)

//@des delete card
//@route delete /deleteCard/id
router.delete('/deleteCard/:id', deleteCard)

module.exports = router
