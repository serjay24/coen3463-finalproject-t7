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

router.post('/signup', function(req,res) {

  var newAccount = {
    studentNo: req.body.studentNumber,
    name: req.body.fullName,
    yearAndSection: req.body.yearSection,
    contact_number: req.body.contactNumber,
    email: req.body.email
  };

  User.findOne({studentNo: newAccount.studentNo}, function(err, getStudentNo){
    if(!getStudentNo) {
      User.register(new User(newAccount), req.body.password, function(err, account){
        if (err) throw err;

        console.log(account);
        res.redirect('/auth/login')

        usernameStatus = "";
        username = "";
        first_name = "";
        last_name = "";
        email = "";
        password = "";
      });
    }
    else {
      console.log(getStudentNo)
      usernameStatus = 'Username already exist';
      console.log(usernameStatus)
      res.redirect('/auth/signup');
    }
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

module.exports = router;
