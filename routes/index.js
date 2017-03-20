var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user) {
		res.render('index', {
			title: 'Express',
		  	user: req.user
		 });
	}
	else {
		res.redirect('/auth/login')
	}
  
});

router.get('/contact', function(req, res) {
	var data = {
		title: "Support - Locker Reservation System",
		user: req.user
	}
	res.render('contact', data)
})

module.exports = router;
