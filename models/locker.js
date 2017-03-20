var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Locker = new Schema({
    cluster: {
        type: String,
        required: true,
        default: ""
    },
    lockerNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model('Locker', Locker);