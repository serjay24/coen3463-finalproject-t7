var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');

/* GET home page. */
router.get('/', function(req, res, next) {

	var data = {
		title: "Locker Reservation System",
		user: req.user
	}

	if(req.user) {
		if(req.user.type === "Administrator") {
			res.render('admin_index', data);
		}
		else {
			res.render('index', data);
		}
	}
	else {
		res.redirect('/auth/login');
	}
  
});

router.get('/contact', function(req, res) {
	var data = {
		title: "Support - Locker Reservation System",
		user: req.user
	}
	res.render('contact', data)
})

router.post('/createLocker', function(req, res) {
	for(var i = 1; i <= 15; i++) {
		var data = {
			cluster: "A",
			lockerNumber: i
		}

		var locker = new Locker(data);
		locker.save(function(err, resultA) {
			if (err) {
				console.log(err);
			}
			else {
				console.log("Success", resultA)
			}
		})
	}

})

module.exports = router;
