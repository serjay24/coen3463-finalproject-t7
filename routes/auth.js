var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: {type: 'error', message: 'Invalid username or password'}
  }),
  function(req, res) {
    res.redirect('/');
});

router.get('/signup', function(req, res, next) {
	res.render('signup', {title: 'Register for an account'})
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

module.exports = router;
