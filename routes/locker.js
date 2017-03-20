var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');

router.get('/locker2', function(req, res) {

	var clusterAResult;
	var cluserBResult;
	var clusterCResult;
	
	Locker.find({cluster: "A"}).sort({lockerNumber: 1}).exec(function(err, clusterA) {
		if (err) throw err;

		//console.log(clusterA)
		clusterAResult = clusterA;

		Locker.find({cluster: "B"}).sort({lockerNumber: 1}).exec(function(err, clusterB) {
			if (err) throw err;

			
			var data = {
				title: "Choose your desire locker",
				clusterA: clusterAResult,
				clusterB: clusterB
			}
			//console.log(data);
			res.render('locker2', data)
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
	var lockerId = req.params.lockerId;

	Locker.find({_id: lockerId}).exec(function(err, result) {
		if (err) throw err;

		var data = {
			title: "Reserve this Locker",
			locker: result,
			//user: req.user
		}

		res.render('reservation_page', data);
	})
	
})

module.exports = router;
