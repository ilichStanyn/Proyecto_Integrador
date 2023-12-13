const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup',  (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => { 
  req.check('firstname', 'el nombre es requerido').notEmpty();
  req.check('username', 'el usuario es requerido').notEmpty();
  req.check('password', 'La contraseña es obligatoria').notEmpty();
  req.check('password1', 'Debe confirme la contraseña elegida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    console.log(errors);
    req.flash('message', errors[0].msg);
    res.redirect('/signup');
  } 
passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})
  (req, res, next);
});

// SINGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => { 
  req.check('username', 'El usuario es requerido').notEmpty();
  req.check('password', 'La contraseña es requerida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    console.log(errors);
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  } 
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })
  (req, res, next);
});

router.get('/logout', function (req, res)  {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('links/profile');
});

module.exports = router;