const express = require('express')
const mainRouter = express.Router()
const {getLogin, postLogin, getLogout, getSignup, postSignup, getHome} = require('../controllers/main.controllers.js')
mainRouter.get('/', getHome)
mainRouter.get('/login', getLogin)
mainRouter.post('/login', postLogin)
mainRouter.get('/logout', getLogout)
mainRouter.get('/signup', getSignup)
mainRouter.post('/signup', postSignup)

module.exports = mainRouter