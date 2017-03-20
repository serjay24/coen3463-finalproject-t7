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

router.get('/clusterA', function(req, res) {

	Locker.find({cluster: "A"}).sort({lockerNumber: 1}).exec(function(err, clusterA) {
		if (err) throw err;

		var data = {
			title: "Cluster A Lockers",
			cluster: clusterA,
			user: req.user
		}
		
		res.render('admin_cluster', data)
	})
})

module.exports = router;
