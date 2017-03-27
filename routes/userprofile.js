var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.user) {
		Locker.find({owner: req.user.name}).exec(function(err, result) {
  			var data = {
  	  			title: req.user.name,
  	  			user: req.user,
  	  			lockers: result
    		}
    		res.render('userprofile', data);
  		})
	}
	else {
		res.redirect('/auth/login');
	}
 })

router.get('/:id/edit-profile', function(req, res) {
	var data = {
  	title: 'Update Profile',
  	user: req.user
  }

  res.render('updateprofile', data);
})

router.post('/:id/edit-profile', function(req, res) {
	const oldData = req.user;

	var userId = req.params.id

	var updatedData_Locker = {
		owner: req.body.fullName,
		email: req.body.email,
		contact_number: req.body.contactNumber
	}

	var updatedData_User = {
		name: req.body.fullName,
		yearAndSection: req.body.yearSection,
		email: req.body.email,
		contact_number: req.body.contactNumber
	}


	Locker.update({owner: req.user.name}, {$set: updatedData_Locker}, {multi: true}, function(err, success) {
		if (err) throw err;

		User.findByIdAndUpdate(userId, updatedData_User, function(err, success) {
			if (err) throw err;
			res.redirect('/userprofile')
		})
	})
})

module.exports = router;
