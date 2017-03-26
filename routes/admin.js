var express = require('express');
var router = express.Router();
var Locker = require('../models/locker');
var User = require('../models/users');

var usernameStatus;

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

router.get('/remove-reservation', function(req, res) {
	var data = {
  	  studentNo: "",
  	  owner: "",
  	  email: "",
  	  contact_number: "",
  	  status: "Available"
    }
  
    Locker.update({status: 'Reserved'}, {$set: data}, {multi: true}, function(err, result) {
  	  if (err) throw err;
  	  res.redirect('/');
    })
})

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

router.get('/signup', function(req, res) {
	var data = {
		title: "Register an Admin Account",
		user: req.user,
		status: usernameStatus
	}
	res.render('admin_register', data);
	usernameStatus = "";
})

router.post('/signup', function(req,res) {

  var newAccount = {
    studentNo: req.body.studentNumber,
    name: req.body.fullName,
    yearAndSection: req.body.yearSection,
    contact_number: req.body.contactNumber,
    email: req.body.email,
    type: "Administrator"
  };

  User.findOne({studentNo: newAccount.studentNo}, function(err, getStudentNo){
    if(!getStudentNo) {
      User.register(new User(newAccount), req.body.password, function(err, account){
        if (err) throw err;

        console.log(account);
        res.redirect('/')

        usernameStatus = "";
        username = "";
        first_name = "";
        last_name = "";
        email = "";
        password = "";
      });
    }
    else {
      console.log(getStudentNo)
      usernameStatus = 'Username already exist';
      console.log(usernameStatus)
      res.redirect('/admin/signup');
    }
  });
});

module.exports = router;
