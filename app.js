const express = require('express');
const app = express()
const methodOverride = require('method-override')
const passport= require('passport')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
//config env file
require('dotenv').config({path: './config/config.env'})
const connectDB = require('./config/db')
const cardRouter = require('./routes/cards.route')
const authRouter = require('./routes/auth.route')

//connect to Database
connectDB()

//set view engine ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
//body-parser 
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//method-override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

app.use(logger('dev'))


// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:  MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
)
// Passport config
require('./config/passport')(passport)
    
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//routes
app.use('/', authRouter)
app.use('/card', cardRouter)

app.listen(process.env.PORT , () =>{
    console.log( `Server is running on ${process.env.PORT} port`)
})
