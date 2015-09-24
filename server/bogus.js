var User = require('./users/userModel.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

var eugene = new User({username: 'Eugene', password: 'asdf', currentTrip: '', pastTrip: []});

console.log(eugene.username);


module.exports = {};
