var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
var User = require('./users');

var Locker = new Schema({
    cluster: {
        type: String,
        required: true,
        default: ""
    },
    studentNo:{
        type: String,
        default: ""
    },
    owner: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    contact_number: {
        type: Number
    },
    lockerNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model('Locker', Locker);