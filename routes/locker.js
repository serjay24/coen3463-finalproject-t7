var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');
var User = require('../models/users');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'cpelocker@gmail.com',
        clientId: '955879144210-e8h36k2pt9b0lfes1qjhv4c3pvsnhu5b.apps.googleusercontent.com',
        clientSecret: 'CcHTPUsTHWLoSfpfHJTZEGu5',
        refreshToken: '1/oK3ihihzeBKRsy0aX2bFxiZaLxTFLF_rk0fdw6BoGXnWRnVymW-xZJX8W59dChjc',
        accessToken: 'ya29.GlsaBEc7YIAfMsDp5OXFTuIVeL373dcQ_efZ95ti-FVYA3Ymd4QuKA4Ll1ztXkxLwwBweLDsQq_Jng_8UzLv3BBT5ZqwCZSNgrot5vjHyVGnREl5NAUju-QULX39'
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
		from: '"ACCESS" <cpelocker@gmail.com>',
		to: req.user.email,
		subject: 'Locker Reservation Complete',
		text: "Your have successfully reserve your desire locker. Please pay the amount of P150.00 pesos at the ACCESS office.\n\n"
		+ "Please remember that all locker reserved but not yet paid will be deleted by the admin for a certain amount of time.\n\n" +
		"To avoid this or other problems, we encourage you to pay the amount as soon as possible.\n\n" +
		"- ACCESS\n\n" +
		"This email is auto-generated."
	}

	

	Locker.findByIdAndUpdate({_id: lockerId}, dataToUpdate, function(err, result) {
		if (err) throw err;

		//console.log(result);
		//res.redirect('/');
		Locker.find({_id: lockerId}).exec(function(err, locker) {
			if (err) throw err;

			var admin = {
				from: 'cpelocker@gmail.com',
				to: 'cpelocker@gmail.com',
				subject: 'New Locker Reservation',
				text: "A new locker has been reserved. Here are the details:\n\n" +
				"Name: " + locker[0].owner + "\n" +
				"Student Number: " + locker[0].studentNo + "\n" +
				"Cluster: " + locker[0].cluster + '\n' +
				"Locker: " + locker[0].cluster + locker[0].lockerNumber
			}

			transporter.sendMail(customer, function(err, success) {
				if (err) throw err;

				console.log("Message Sent! - Customer Copy", success);
				transporter.sendMail(admin, function(err, success) {
					if (err) throw err;

					console.log("Message Sent! - Admin's Copy", success);
					res.redirect('/');
				})
			})

		})
				
	})
})

module.exports = router;
