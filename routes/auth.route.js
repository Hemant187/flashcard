const express = require('express')
const mainRouter = express.Router()
const passport = require('passport')
const {getLogin, postLogin, getLogout, getSignup, postSignup, getHome, googleAuth, googleRedirect} = require('../controllers/main.controllers.js')
mainRouter.get('/', getHome)
mainRouter.get('/login', getLogin)
mainRouter.post('/login', postLogin)
mainRouter.get('/logout', getLogout)
mainRouter.get('/signup', getSignup)
mainRouter.post('/signup', postSignup)
//Google Auth
mainRouter.get('/auth/google', googleAuth)
mainRouter.get('/auth/google/callback',googleRedirect)

module.exports = mainRouter