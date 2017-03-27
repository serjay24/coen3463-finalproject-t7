var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');

var errorMessage = "<h1>You do not have permission to access this page. Contact Administrator for support.</h1>";

var _ = require('lodash');
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

var emailList = [];

/* GET home page. */
router.get('/', function(req, res, next) {

	var clusterA;
	var clusterB;
	var clusterC;

	

	if(req.user) {
		if(req.user.type === "Administrator") {
			Locker.find({cluster: "A", status: "Available"}).exec(function(err, clusterA) {
				if (err) throw err;

				this.clusterA = clusterA.length

				Locker.find({cluster: "B", status: "Available"}).exec(function(err, clusterB) {
					if (err) throw err;

					this.clusterB = clusterB.length

					Locker.find({cluster: "C", status: "Available"}).exec(function(err, clusterC) {
						if (err) throw err;

						this.clusterC = clusterC.length

						Locker.find({cluster: "D", status: "Available"}).exec(function(err, clusterD) {
							if (err) throw err;

							var data = {
								title: "Locker Reservation System",
								clusterA: this.clusterA,
								clusterB: this.clusterB,
								clusterC: this.clusterC,
								clusterD: clusterD.length,
								user: req.user
							}
							res.render('admin_index', data);
						})
					})
				})
			})
			
		}
		else {

			var data = {
				title: "Locker Reservation System",
				user: req.user
			}

			res.render('index', data);
		}
	}
	else {
		res.redirect('/auth/login');
	}
  
});

router.get('/how-to', function(req, res) {
	res.render('instruction');
})

router.get('/notify-all', function(req, res) {

	if(req.user) {
		if(req.user.type === "Administrator") {
			Locker.find({status: 'Paid'}).exec(function(err, result) {
				for(var i = 0; i < result.length; i++) {
					if (result[i].email === "") {
						continue
					}
					else {
						emailList.push(result[i].email);
					}
				}

				emailList = _.uniq(emailList);

				var notification = {
					from: '"ACCESS" <cpelocker@gmail.com>',
					to: emailList,
					subject: "Cleaning of Lockers",
					text: "Good Day,\n\n" + "All locker owner should remove their things and clean up the locker they rent.\n\n" +
					"Please be reminded that failure to comply will affect your clearance for this semester.\n\n" +
					"We would like to thank you for using our locker and we hope that it helps you throughout this semester.\n\n" +
					"Godbless, and enjoy your vacation!\n\n" +
					"- ACCESS\n\n" +
					"This email is auto-generated."
				}

				transporter.sendMail(notification, function(err, success) {
					if (err) throw err;

					console.log('Message Sent!')
					res.redirect('/');
					emailList = [];
				})
			})
		}
		else {
			res.send(errorMessage);
		}
	}
	else {
		res.redirect('/auth/login');
	}
})

module.exports = router;
