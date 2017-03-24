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

router.get('/lockerrefresh', function(req, res) {
  var data = {
  	studentNo: "",
  	owner: "",
  	email: "",
  	contact_number: "",
  	status: "Available"
  }
  
  Locker.update({}, {$set: data}, {multi: true}, function(err, result) {
  	if (err) throw err;
  	res.redirect('/');
  })

});

router.get('/payment/:lockerId/cluster/:letter', function(req, res) {
  var lockerId = req.params.lockerId;
  var cluster = req.params.letter;

  Locker.update({_id: lockerId}, {$set: {status: "Paid"}}, function(err, result) {
  	if (err) throw err;

  	res.redirect('/admin/cluster/' + cluster);
  })
});

router.get('/delete/:lockerId/cluster/:letter', function(req, res) {
  var lockerId = req.params.lockerId;
  var cluster = req.params.letter;

  var data = {
  	studentNo: "",
  	owner: "",
  	email: "",
  	contact_number: "",
  	status: "Available"
  }
  
  Locker.update({_id: lockerId}, {$set: data}, function(err, result) {
  	if (err) throw err;
  	res.redirect('/admin/cluster/' + cluster);
  })
});

router.get('/cluster/:letter', function(req, res) {

	var clusterSelected = req.params.letter;

	console.log(clusterSelected);

	Locker.find({cluster: clusterSelected}).sort({lockerNumber: 1}).exec(function(err, cluster) {
		if (err) throw err;

		var data = {
			title: "Cluster " + clusterSelected + " Lockers",
			cluster: cluster,
			user: req.user
		}
		
		res.render('admin_cluster', data)
	})
})

module.exports = router;
