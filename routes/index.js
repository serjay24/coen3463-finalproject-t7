var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');

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
