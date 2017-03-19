var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
    	type: String,
    	required: true
    },
    email: {
    	type: String,
    	required: true
    },
    first_name: String,
    last_name: String,
});

User.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', User);