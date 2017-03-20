var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');
var User = require('../models/users')

/* GET home page. */
router.get('/viewLockers', function(req, res) {
  var data = {
  	title: "View Lockers",
  	user: req.user
  }
  res.render('admin_view_locker', data)
});

router.get('/cluster/:letter', function(req, res) {

	var clusterSelected = req.params.letter;

	console.log(clusterSelected);

	Locker.find({cluster: clusterSelected}).sort({lockerNumber: 1}).exec(function(err, cluster) {
		if (err) throw err;

		var data = {
			title: "Cluster A Lockers",
			cluster: cluster,
			user: req.user
		}
		
		res.render('admin_cluster', data)
	})
})

module.exports = router;
