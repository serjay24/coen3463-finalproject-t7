var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');

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

var statusValue;

router.get('/', function(req, res) {
	var data = {
		title: "Support - Locker Reservation System",
		statusValue: statusValue,
		user: req.user
	}
	res.render('contact', data);
	statusValue = "";
})

router.post('/send-email', function(req, res) {
	var inquiry = {
		from: 'cpelocker@gmail.com',
		to: 'cpelocker@gmail.com',
		subject: 'New Inquiry',
		text: "Name: " + req.body.name + '\n' +
		"Email: " + req.body.email + '\n' +
		"Message: " + req.body.message
	}

	var acknowledgement = {
		from: '"ACCESS" <cpelocker@gmail.com>',
		to: req.body.email,
		subject: 'Acknowledgement of your Inquiry',
		text: req.body.name + ",\n\n" + 
		"Thank you for contacting us. We have received your inquiry. Kindly wait for our reply regarding your inquiry.\n\n" +
		"Rest assure that your inquiry will be answer and will not be abandoned. Should you have any other concerns, email us again" +
		" or for faster support, contact us through our mobile number indicated in Contact Us page of our website.\n\n" +
		"Have a nice day ahead.\n\n" +
		"- ACCESS\n\n" +
		"This email is auto-generated."
	}

	transporter.sendMail(inquiry, function(err, success) {
		if (err) throw err;

		console.log("Message Sent! - Admin's Copy");


		transporter.sendMail(acknowledgement, function(err, success) {
			if (err) throw err;

			console.log("Message Sent! - Customer's Copy");
			statusValue = 'Message Sent!';
			res.redirect('/contact');
		})
	})
})

module.exports = router;
