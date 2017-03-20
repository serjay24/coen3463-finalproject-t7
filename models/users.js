var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
var Locker = require('./locker');

var User = new Schema({
    studentNo: {
        type: String,
        required: true,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    yearAndSection: {
        type: String,
        default: ""
    },
    contact_number: {
        type: Number
    },
    email: {
    	type: String,
    	required: true
    },
    type: {
        type: String,
        default: "User"
    }
});

User.plugin(passportLocalMongoose, {usernameField: 'studentNo'});

module.exports = mongoose.model('User', User);