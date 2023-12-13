const passport = require('passport');
/*const { Strategy } = require('passport-local');*/
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const { Result } = require('express-validator');
const helpers = require('./helpers');
const { check } = require('express-validator/check');



passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM USER WHERE USERNAME = ?', [username]);
   
    if (rows.length > 0) {
      const user = rows[0];
      const ValidPassword = await helpers.matchPassword(password, user.password)

        if (ValidPassword)  {
          done(null, user, req.flash('success', 'Bienvenido.... ' + user.username));
        } else {
          done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
      } else {
        return done(null, false, req.flash('message', 'Los datos no son correctos.'));
      }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username, password, done) =>{
    const {firstname, lastname} = req.body;
    let newUser = {
        username,
        password,
        firstname,
        lastname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO user SET?', newUser);
    newUser.id = result.insertId;
    return done(null, newUser)
}));



// ver documentacion https://www.passportjs.org/concepts/authentication/sessions/

passport.serializeUser((user, done) => {
    done(null, user.username);
    console.log(passport.serializeUser);
    console.log(user.username);
  });


// deserailize session porque sino va tirar un error de out of session cuando actualice la web

  passport.deserializeUser(async (user, done) => {
    const rows = await pool.query('SELECT * FROM USER WHERE USERNAME = ?', [user]);
    done(null, rows[0]);
  });