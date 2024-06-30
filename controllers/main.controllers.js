const User = require('../model/user.model')
const passport = require('passport')
const validator = require('validator')

const getHome = (req,res)=>{
  res.redirect('/login')
}
const getLogin = (req, res) => {
  if(req.user){
    return res.redirect('/card')
  }
  res.render('login')
}

const postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect('/card')
    })
  })(req, res, next)
}

const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
}

const getSignup =  (req, res) => {
  if (req.user) {
    return res.redirect('/card')
  }
  res.render('signup', {
    title: 'Create Account'
  })
}

const postSignup = async (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('../signup')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] })
    
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address or username already exists.' });
      return res.redirect('../signup');
    }
  
    await user.save();
  
    req.logIn(user, (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/card');
    });
  } catch (err) {
    return next(err);
  }

}

// Define the googleAuth function to return the middleware directly
const googleAuth = passport.authenticate('google', { scope: ['profile'] });

// Define the googleRedirect function to return an array of middleware and handler
const googleRedirect = [
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/card');
  }
];

module.exports = {
  getLogin, postLogin, getLogout, getSignup, postSignup, getHome, googleAuth, googleRedirect
}