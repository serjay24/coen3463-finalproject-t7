var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = {
  	title: req.user.name,
  	user: req.user
  }
  res.render('userprofile.jade', data)
});

module.exports = router;
