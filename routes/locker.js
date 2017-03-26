var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');
var User = require('../models/users');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'fixit.solution.v1@gmail.com',
        clientId: '917097726441-p35t6fo03goi9u5ct6k6n8rg0mv19fbc.apps.googleusercontent.com',
        clientSecret: 'bIIhfXrbunz6lwWJ-7lyYyEl',
        refreshToken: '1/yhNux2J9zxZ6Tu-NmNzKJm_GSe_7zvf6uD5SPwvW9Xk',
        accessToken: 'ya29.GlvlA8oq4Cmm-LR7KFGOAdB6bfn1S_vr7HkQnqpjXyV7H3QflTNjPcgG6QjiZXq3AC-c_wu67AcHCCIEa-mitEszJAkRJZASTpPBH-_4N2RHVFa4XFlGjltkRAxE'
    }
});

router.get('/locker1', function(req, res) {
	Locker.find({cluster: "D"}).sort({lockerNumber: 1}).exec(function(err, clusterD) {
		if (err) throw err;

		var data = {
			title: "Reserve Locker",
			clusterD: clusterD,
			user: req.user
		}

		res.render('locker1', data);
	})
})

router.get('/locker2', function(req, res) {

	var clusterAResult;
	var clusterBResult;
	
	Locker.find({cluster: "A"}).sort({lockerNumber: 1}).exec(function(err, clusterA) {
		if (err) throw err;

		//console.log(clusterA)
		clusterAResult = clusterA;

		Locker.find({cluster: "B"}).sort({lockerNumber: 1}).exec(function(err, clusterB) {
			if (err) throw err;

			clusterBResult = clusterB;

			Locker.find({cluster: "C"}).sort({lockerNumber: 1}).exec(function(err, clusterC) {
				var data = {
					title: "Choose your desire locker",
					clusterA: clusterAResult,
					clusterB: clusterBResult,
					clusterC: clusterC,
					user: req.user
				}
				//console.log(data);
				res.render('locker2', data)
			})
		})
	})
})

router.post('/createLocker', function(req, res) {
	for(var i = 1; i <= 15; i++) {
		var data = {
			cluster: "A",
			lockerNumber: i
		}

		var locker = new Locker(data);

		locker.save(function(err, result) {
			if (err) throw err;

			console.log(result)
		})
	}

	for(var i = 1; i <= 15; i++) {
		var data = {
			cluster: "B",
			lockerNumber: i
		}

		var locker = new Locker(data);

		locker.save(function(err, result) {
			if (err) throw err;

			console.log(result)
		})
	}

	for(var i = 1; i <= 15; i++) {
		var data = {
			cluster: "C",
			lockerNumber: i
		}

		var locker = new Locker(data);

		locker.save(function(err, result) {
			if (err) throw err;

			console.log(result)
		})
	}

	for(var i = 1; i <= 15; i++) {
		var data = {
			cluster: "D",
			lockerNumber: i
		}

		var locker = new Locker(data);

		locker.save(function(err, result) {
			if (err) throw err;

			console.log(result)
		})
	}

	res.redirect('/locker/locker2')

})

router.get('/:lockerId/reserve', function(req, res) {
	
	if(req.user) {
		var lockerId = req.params.lockerId;

		Locker.find({_id: lockerId}).exec(function(err, result) {
			if (err) throw err;

			var data = {
				title: "Reserve Locker",
				locker: result,
				user: req.user
			}

			res.render('reservation_page', data);
		})
	}
	else {
		res.redirect('/auth/login');
	}
	
})

router.get('/:lockerId/reserveCompletion', function(req, res) {
	var lockerId = req.params.lockerId;
	
	var dataToUpdate = {
		status: "Reserved",
		studentNo: req.user.studentNo,
		owner: req.user.name,
		email: req.user.email,
		contact_number: req.user.contact_number
	}

	var customer = {
		from: '"Serjay Ilaga" <fixit.solution.v1@gmail.com>',
		to: req.user.email,
		subject: 'Testing Nodemailer',
		text: "Locker Reserved"
	}

	Locker.findByIdAndUpdate({_id: lockerId}, dataToUpdate, function(err, result) {
		if (err) throw err;

		//console.log(result);
		//res.redirect('/');
		transporter.sendMail(customer, function(err, success) {
			if (err) throw err;

			console.log("Message Sent!", success);
			res.redirect('/');
		})		
	})
})

module.exports = router;
